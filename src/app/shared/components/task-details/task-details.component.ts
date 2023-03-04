import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Project, Task } from '../../../models';
import { KanbanViewActions } from '../../../store/actions';
import { TaskDetailsActions } from '../../../store/actions/task-details.actions';
import { selectProjects } from '../../../store/reducers/projects.reducer';
import { selectCurrentTask } from '../../../store/selectors/tasks.selectors';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';

@Component({
  selector: 'yata-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnDestroy, OnInit {
  readonly PRIORITY_NONE = Task.Priority.NONE;
  readonly PRIORITY_HIGH = Task.Priority.HIGH;
  readonly PRIORITY_MEDIUM = Task.Priority.MEDIUM;
  readonly PRIORITY_LOW = Task.Priority.LOW;

  destroy$ = new Subject<void>();
  currentTask$?: Observable<Task | undefined>;
  projects$ = this.store.select(selectProjects);
  isAddingSubtask = false;
  form!: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
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

  openDateTimePickerDialog() {
    const dueDate: Date | null = this.dueDateControl.value;
    const ref = this.dialog.open(DateTimePickerDialogComponent, {
      data: dueDate,
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((dueDate) => {
        this.dueDateControl.setValue(dueDate);
        this.dueDateControl.markAsDirty();
      });
  }

  trackByProjectId(index: number, project: Project) {
    return project.id;
  }

  initForm(task: Task) {
    this.form = this.fb.group({
      id: [task.id],
      title: [
        task.title,
        [Validators.required, Validators.maxLength(Task.Title.MaxLength)],
      ],
      priority: [task.priority],
      completed: [task.completed],
      projectId: [task.projectId],
      dueDate: [],
      subtasks: this.fb.array([]),
      content: [task.content, [Validators.maxLength(Task.Content.MaxLength)]],
    });

    if (task.dueDate) {
      this.dueDateControl.setValue(new Date(task.dueDate));
    }
  }

  get priorityControl() {
    return this.form.get('priority') as FormControl;
  }

  get subtasksControls() {
    return this.form.get('subtasks') as FormArray;
  }

  get dueDateControl() {
    return this.form.get('dueDate') as FormControl;
  }

  handleGoBack() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

  handlePriorityChange(priority: Task.Priority) {
    this.priorityControl.setValue(priority);
  }

  handleMoveTaskToProject(projectId: number) {
    const task: Task = this.form.value;
    this.store.dispatch(
      TaskDetailsActions.moveTaskToProject({
        task: {
          id: task.id,
          projectId,
          sectionId: null,
        },
      })
    );
  }

  handleCompleted() {
    const task: Task = this.form.value;
    this.store.dispatch(
      KanbanViewActions.updateTask({
        task: {
          id: task.id,
          projectId: task.projectId,
          completed: task.completed,
        },
      })
    );
  }

  handleSave() {
    console.log(this.form);
    if (this.form.invalid || this.form.pristine) {
      return;
    }

    const task: Task = this.form.value;
    this.store.dispatch(TaskDetailsActions.updateTask({ task }));
  }
}
