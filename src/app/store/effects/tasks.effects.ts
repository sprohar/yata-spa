import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { ApiErrorResponse } from '../../interfaces/api-error-response';
import { EisenhowerService } from '../../services/eisenhower.service';
import { TasksService } from '../../services/tasks.service';
import {
  CreateTaskComponentActions,
  EisenhowerMatrixActions,
  KanbanViewActions,
  ListViewActions,
  TaskCardActions,
  TaskDetailsActions,
  YataApiActions,
} from '../actions';
import { TaskOptionsMenuActions } from '../actions/task-options-menu.actions';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
    private eisenhowerService: EisenhowerService,
    private snackbar: MatSnackBar
  ) {}

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

  duplicate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskOptionsMenuActions.duplicateTask),
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
      ofType(TaskOptionsMenuActions.deleteTask),
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

  getAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EisenhowerMatrixActions.onInit),
      exhaustMap((_) =>
        this.eisenhowerService.getAllTasks().pipe(
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

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        KanbanViewActions.updateTask,
        TaskCardActions.updateTask,
        KanbanViewActions.moveTaskToSection,
        TaskDetailsActions.updateTask,
        TaskDetailsActions.moveTaskToProject,
        ListViewActions.markTaskAsComplete,
        ListViewActions.markTaskAsIncomplete,
        ListViewActions.moveTaskToSection,
        ListViewActions.updateTaskListItem
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
