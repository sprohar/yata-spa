import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Priority, Project, Section, Tag, Task } from '../../../models';
import { TaskDetailsActions } from '../../../store/actions';
import { selectProjects } from '../../../store/reducers/projects.reducer';
import {
  selectCurrentTask,
  selectSections,
  selectTags,
} from '../../../store/selectors';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';
import { TagsSelectListDialogComponent } from '../tags-select-list-dialog/tags-select-list-dialog.component';

@Component({
  selector: 'yata-task-details-dialog',
  templateUrl: './task-details-dialog.component.html',
  styleUrls: ['./task-details-dialog.component.scss'],
})
export class TaskDetailsDialogComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly PRIORITY_NONE = Priority.NONE;
  readonly PRIORITY_HIGH = Priority.HIGH;
  readonly PRIORITY_MEDIUM = Priority.MEDIUM;
  readonly PRIORITY_LOW = Priority.LOW;

  currentTask$?: Observable<Task | undefined>;
  projects$ = this.store.select(selectProjects);
  sections$ = this.store.select(selectSections);
  tags$ = this.store.select(selectTags);

  isAddingSubtask = false;
  form!: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.store.dispatch(TaskDetailsActions.resetCurrentTaskId());
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.currentTask$ = this.store.select(selectCurrentTask).pipe(
      tap((task) => {
        if (task) {
          this.initForm(task);
        }
      })
    );
  }

  openTagsSelectListDialog(task: Task) {
    const ref = this.dialog.open(TagsSelectListDialogComponent, {
      data: task,
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.changeDetectorRef.detectChanges();
        }
      });
  }

  openDateTimePickerDialog() {
    const dueDate: Date | null = this.dueDateControl.value;
    const ref = this.dialog.open(DateTimePickerDialogComponent, {
      data: dueDate,
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((dueDate: string | Date | null) => {
        // When the user clicks the cancel button, an empty string is returned
        if (typeof dueDate !== 'string') {
          this.dueDateControl.setValue(dueDate);
          this.dueDateControl.markAsDirty();
        }
      });
  }

  trackByProjectId(_index: number, project: Project) {
    return project.id;
  }

  trackBySectionId(_index: number, section: Section) {
    return section.id;
  }

  initForm(task: Task) {
    this.form = this.fb.group({
      id: [task.id],
      title: [
        task.title,
        [Validators.required, Validators.maxLength(Task.Title.MaxLength)],
      ],
      priority: [task.priority],
      isCompleted: [task.isCompleted],
      isAllDay: [task.isAllDay],
      projectId: [task.projectId],
      dueDate: [task.dueDate ? new Date(task.dueDate) : null],
      // subtasks: this.fb.array([]),
      tags: this.fb.array([]),
      description: [
        task.content,
        [Validators.maxLength(Task.Description.MaxLength)],
      ],
    });

    if (task.tags) {
      const formArray = this.form.get('tags') as FormArray;
      for (const tag of task.tags) {
        formArray.push(
          this.fb.group({
            id: [tag.id],
            name: [tag.name],
          })
        );
      }
    }
  }

  get tagsControl() {
    return this.form.get('tags') as FormArray;
  }

  get priorityControl() {
    return this.form.get('priority') as FormControl;
  }

  get isCompletedControl() {
    return this.form.get('isCompleted') as FormControl;
  }

  get dueDateControl() {
    return this.form.get('dueDate') as FormControl;
  }

  get isAllDayControl() {
    return this.form.get('isAllDay') as FormControl;
  }

  removeDueDate() {
    this.form.patchValue({
      dueDate: null,
    });
  }

  removeTag(task: Task, tag: Tag) {
    this.store.dispatch(
      TaskDetailsActions.removeTagFromTask({
        task,
        tag,
      })
    );
  }

  handleDeleteSubtask(subtask: Task) {
    this.store.dispatch(
      TaskDetailsActions.deleteSubtask({
        subtask,
      })
    );
  }

  handlePriorityChange(priority: Priority) {
    this.priorityControl.setValue(priority);
  }

  handleChecked() {
    const task: Task = this.form.value;
    this.store.dispatch(
      TaskDetailsActions.updateTask({
        task: {
          id: task.id,
          isCompleted: task.isCompleted,
        },
      })
    );
  }

  handleSave() {
    if (this.form.invalid || this.form.pristine) {
      return;
    }

    const task: Task = this.form.value;
    this.store.dispatch(TaskDetailsActions.updateTask({ task }));
  }
}
