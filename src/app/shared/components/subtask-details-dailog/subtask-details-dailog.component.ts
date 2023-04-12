import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Priority, Project, Section, Tag, Task } from '../../../models';
import { TaskDetailsActions } from '../../../store/actions';
import { selectProjects, selectSections } from '../../../store/selectors';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';

@Component({
  selector: 'yata-subtask-details-dailog',
  templateUrl: './subtask-details-dailog.component.html',
  styleUrls: ['./subtask-details-dailog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubtaskDetailsDailogComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly PRIORITY_NONE = Priority.NONE;
  readonly PRIORITY_HIGH = Priority.HIGH;
  readonly PRIORITY_MEDIUM = Priority.MEDIUM;
  readonly PRIORITY_LOW = Priority.LOW;

  projects$ = this.store.select(selectProjects);
  sections$ = this.store.select(selectSections);
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Task,
    private dialogRef: MatDialogRef<SubtaskDetailsDailogComponent>,
    private store: Store,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm(this.data);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  initForm(subtask: Task) {
    this.form = this.fb.group({
      id: [subtask.id],
      title: [
        subtask.title,
        [Validators.required, Validators.maxLength(Task.Title.MaxLength)],
      ],
      priority: [subtask.priority],
      isCompleted: [subtask.isCompleted],
      isAllDay: [subtask.isAllDay],
      parentId: [subtask.parentId],
      projectId: [subtask.projectId],
      dueDate: [subtask.dueDate ? new Date(subtask.dueDate) : null],
      description: [
        subtask.content,
        [Validators.maxLength(Task.Description.MaxLength)],
      ],
    });
  }

  get parentIdControl() {
    return this.form.get('parentId') as FormControl;
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

    const subtask: Task = this.form.value;
    this.store.dispatch(TaskDetailsActions.updateSubtask({ task: subtask }));
    this.dialogRef.close();
  }
}
