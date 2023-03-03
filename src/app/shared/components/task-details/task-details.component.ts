import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Project, Task } from '../../../models';
import { KanbanViewActions } from '../../../store/actions';
import { TaskDetailsActions } from '../../../store/actions/task-details.actions';
import { selectProjects } from '../../../store/reducers/projects.reducer';
import { selectCurrentTask } from '../../../store/selectors/tasks.selectors';

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

  currentTask$?: Observable<Task | undefined>;
  projects$ = this.store.select(selectProjects);
  isAddingSubtask = false;
  form!: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.store.dispatch(TaskDetailsActions.resetCurrentTaskId());
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

  handleGoBack() {
    this.router.navigate(['../..'], { relativeTo: this.route });
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
  }

  get priorityControl() {
    return this.form.get('priority') as FormControl;
  }

  get subtasksControls() {
    return this.form.get('subtasks') as FormArray;
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
    if (this.form.invalid || this.form.pristine) {
      return;
    }

    const task: Task = this.form.value;
    this.store.dispatch(TaskDetailsActions.updateTask({ task }));
  }
}
