import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { Priority, Project, Section, Tag, Task } from '../../../models';
import { TaskDetailsActions } from '../../../store/actions';
import { selectProjects } from '../../../store/reducers/projects.reducer';
import {
  selectCurrentTask,
  selectSections,
  selectTags,
} from '../../../store/selectors';
import { TaskPriorityPipe } from '../../pipes/task-priority.pipe';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';
import { TagsSelectListDialogComponent } from '../tags-select-list-dialog/tags-select-list-dialog.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskOptionsComponent } from '../task-options/task-options.component';
import { TaskPriorityPickerComponent } from '../task-priority-picker/task-priority-picker.component';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'yata-task-details-dialog',
  templateUrl: './task-details-dialog.component.html',
  styleUrls: ['./task-details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    TaskListComponent,
    NgFor,
    TaskComponent,
    TaskOptionsComponent,
    CreateTaskComponent,
    MatSelectModule,
    MatOptionModule,
    TaskPriorityPickerComponent,
    MatChipsModule,
    AsyncPipe,
    DatePipe,
    TaskPriorityPipe,
  ],
})
export class TaskDetailsDialogComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  readonly PRIORITY_NONE = Priority.NONE;
  readonly PRIORITY_HIGH = Priority.HIGH;
  readonly PRIORITY_MEDIUM = Priority.MEDIUM;
  readonly PRIORITY_LOW = Priority.LOW;
  readonly projects$ = this.store.select(selectProjects);
  readonly sections$ = this.store.select(selectSections);
  readonly tags$ = this.store.select(selectTags);
  readonly currentTask$ = this.store.select(selectCurrentTask).pipe(
    tap((task) => {
      if (task) {
        this.initForm(task);
      }
    })
  );

  form!: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.store.dispatch(TaskDetailsActions.clearCurrentTaskId());
    this.destroy$.next();
  }

  initForm(task: Task): void {
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
      tags: this.fb.array([]),
      description: [
        task.description,
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

  openTagsSelectListDialog(task: Task) {
    const ref = this.dialog.open(TagsSelectListDialogComponent, {
      data: task,
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: boolean | string) => {
        if (result) {
          // A tag was added
          this.changeDetectorRef.detectChanges();
        }
      });
  }

  openDateTimePickerDialog() {
    const ref = this.dialog.open(DateTimePickerDialogComponent, {
      data: this.dueDateControl.value,
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((dueDate: string | Date | null) => {
        // When the user clicks the cancel button, an empty string is returned
        if (typeof dueDate === 'string') {
          return;
        }

        this.dueDateControl.setValue(dueDate);
        this.dueDateControl.markAsDirty();
        this.store.dispatch(
          TaskDetailsActions.updateTask({
            task: {
              id: this.form.value.id,
              dueDate: dueDate ? dueDate.toISOString() : null,
            },
          })
        );
      });
  }

  trackByProjectId(_index: number, project: Project) {
    return project.id;
  }

  trackBySectionId(_index: number, section: Section) {
    return section.id;
  }

  get tagsControl() {
    return this.form.get('tags') as FormArray;
  }

  get priorityControl() {
    return this.form.get('priority') as FormControl<Priority>;
  }

  get isCompletedControl() {
    return this.form.get('isCompleted') as FormControl<boolean>;
  }

  get dueDateControl() {
    return this.form.get('dueDate') as FormControl<Date | null>;
  }

  get isAllDayControl() {
    return this.form.get('isAllDay') as FormControl<boolean>;
  }

  handleRemoveDueDate() {
    this.form.patchValue({
      dueDate: null,
    });

    this.store.dispatch(
      TaskDetailsActions.updateTask({
        task: {
          id: this.form.value.id,
          dueDate: null,
        },
      })
    );
  }

  handleRemoveTag(task: Task, tag: Tag) {
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
    const task: Task = this.form.value;
    this.store.dispatch(
      TaskDetailsActions.updateTask({
        task: {
          id: task.id,
          priority: task.priority,
        },
      })
    );
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

  handleDescriptionChange() {
    const task: Task = this.form.value;
    this.store.dispatch(
      TaskDetailsActions.updateTask({
        task: {
          id: task.id,
          description: task.description,
        },
      })
    );
  }

  handleGetPreviousTask() {
    this.store.dispatch(TaskDetailsActions.getPreviousTask());
  }

  handleGetNextTask() {
    this.store.dispatch(TaskDetailsActions.getNextTask());
  }

  handleCreateSubtask(parent: Task) {
    this.dialog.open(CreateTaskDialogComponent, {
      data: {
        parent,
      },
    });
  }
}
