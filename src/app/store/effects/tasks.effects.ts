import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ApiErrorResponse } from '../../error/api-error-response';
import { TasksService } from '../../services/tasks.service';
import {
  CreateTaskComponentActions,
  EisenhowerMatrixActions,
  KanbanViewActions,
  ListViewActions,
  TaskCardActions,
  TaskDetailsActions,
  TaskOptionsActions,
  YataApiActions,
} from '../actions';
import { TaskListActions } from '../actions/task-list.actions';
import { TaskActions } from '../actions/task.actions';
import { selectTasksState } from '../reducers/tasks.reducer';

@Injectable()
export class TasksEffects {
  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly tasksService: TasksService,
    private readonly snackbar: MatSnackBar
  ) {}

  getNextTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskDetailsActions.getNextTask),
      concatLatestFrom(() => this.store.select(selectTasksState)),
      map(([_, state]) => {
        const currentTaskIndex = state.tasks.findIndex(
          (t) => t.id === state.currentTaskId
        );
        const nextTaskIndex = (currentTaskIndex + 1) % state.tasks.length;
        const nextTask = state.tasks[nextTaskIndex];
        const currentUrl = this.router.url;
        const url =
          currentUrl.substring(0, currentUrl.lastIndexOf('/')) +
          `/${nextTask.id}`;

        this.router.navigateByUrl(url);
        return TaskDetailsActions.setCurrentTaskId({
          currentTaskId: 1,
        });
      })
    )
  );

  loadTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskOptionsActions.viewDetails),
      switchMap((action) =>
        this.tasksService.get(action.task.id!).pipe(
          map((task) => YataApiActions.loadTaskSuccess({ task })),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.loadTaskError({
                error,
              })
            )
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CreateTaskComponentActions.createTask,
        KanbanViewActions.createTask,
        ListViewActions.createTaskInSection
      ),
      concatMap((action) =>
        this.tasksService.create(action.task).pipe(
          map((task) => YataApiActions.createTaskSuccess({ task })),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.createTaskError({
                error,
              })
            )
          )
        )
      )
    )
  );

  createSubtask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TaskDetailsActions.createSubtask,
        CreateTaskComponentActions.createSubtask
      ),
      concatMap((action) =>
        this.tasksService.create(action.subtask).pipe(
          map((subtask) => YataApiActions.createSubtaskSuccess({ subtask })),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.createSubtaskError({
                error,
              })
            )
          )
        )
      )
    )
  );

  duplicate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskOptionsActions.duplicateTask),
      concatMap((action) =>
        this.tasksService.duplicate(action.task).pipe(
          map((task) => YataApiActions.createTaskSuccess({ task })),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.createTaskError({
                error,
              })
            )
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskOptionsActions.deleteTask),
      mergeMap((action) =>
        this.tasksService.delete(action.task).pipe(
          map(() => YataApiActions.deleteTaskSuccess({ task: action.task })),
          tap(() => this.snackbar.open('Removed task')),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.deleteTaskError({
                error,
              })
            )
          )
        )
      )
    )
  );

  deleteSubtask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskDetailsActions.deleteSubtask),
      mergeMap((action) =>
        this.tasksService.delete(action.subtask).pipe(
          map(() =>
            YataApiActions.deleteSubtaskSuccess({ subtask: action.subtask })
          ),
          tap(() => this.snackbar.open('Removed subtask')),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.deleteSubtaskError({
                error,
              })
            )
          )
        )
      )
    )
  );

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EisenhowerMatrixActions.onInit),
      exhaustMap((_) =>
        this.tasksService.getAll().pipe(
          map((res) => YataApiActions.loadTasksSuccess({ tasks: res.data })),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.loadTasksError({
                error,
              })
            )
          )
        )
      )
    )
  );

  removeTagFromTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskDetailsActions.removeTagFromTask),
      mergeMap((action) =>
        this.tasksService.removeTag(action.task, action.tag).pipe(
          map((task) => YataApiActions.updateTaskSuccess({ task })),
          catchError((error: ApiErrorResponse) =>
            of(YataApiActions.updateTaskError({ error }))
          )
        )
      )
    )
  );

  moveTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskListActions.moveTask),
      concatMap((action) =>
        this.tasksService.update(action.task.id!, action.task).pipe(
          map((task) => YataApiActions.updateTaskSuccess({ task })),
          tap(() => this.snackbar.open('Updated task')),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.updateTaskError({
                error,
              })
            )
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        KanbanViewActions.updateTask,
        TaskCardActions.updateTask,
        KanbanViewActions.moveTaskToSection,
        TaskDetailsActions.updateTask,
        TaskDetailsActions.updateSubtask,
        TaskDetailsActions.moveTaskToProject,
        ListViewActions.moveTaskToSection,
        TaskActions.updateTask,
        EisenhowerMatrixActions.moveTask
      ),
      concatMap((action) =>
        this.tasksService.update(action.task.id!, action.task).pipe(
          map((task) => YataApiActions.updateTaskSuccess({ task })),
          tap(() => this.snackbar.open('Updated task')),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.updateTaskError({
                error,
              })
            )
          )
        )
      )
    )
  );
}
