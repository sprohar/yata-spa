import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
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
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Priority, Project, Section, Tag, Task } from '../../../models';
import { TaskDetailsActions } from '../../../store/actions';
import { selectProjects, selectSections } from '../../../store/selectors';
import { TaskPriorityPipe } from '../../pipes/task-priority.pipe';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';
import { TaskPriorityPickerComponent } from '../task-priority-picker/task-priority-picker.component';

@Component({
  selector: 'yata-subtask-details-dailog',
  templateUrl: './subtask-details-dailog.component.html',
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
    MatSelectModule,
    NgFor,
    MatOptionModule,
    TaskPriorityPickerComponent,
    MatChipsModule,
    AsyncPipe,
    DatePipe,
    TaskPriorityPipe,
  ],
})
export class SubtaskDetailsDailogComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly PRIORITY_NONE = Priority.NONE;
  readonly PRIORITY_HIGH = Priority.HIGH;
  readonly PRIORITY_MEDIUM = Priority.MEDIUM;
  readonly PRIORITY_LOW = Priority.LOW;
  readonly projects$ = this.store.select(selectProjects);
  readonly sections$ = this.store.select(selectSections);

  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Task,
    private readonly dialogRef: MatDialogRef<SubtaskDetailsDailogComponent>,
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly fb: FormBuilder
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
