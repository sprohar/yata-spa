import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import {
  CreateTaskActions,
  KanbanViewActions,
  YataApiActions,
} from '../actions';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
    private snackbar: MatSnackBar
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateTaskActions.createTask),
      concatMap((action) =>
        this.tasksService.create(action.task).pipe(
          map((task) => YataApiActions.createTaskSuccess({ task })),
          catchError(() =>
            of(
              YataApiActions.createTaskError({
                message: 'Could not create Task',
              })
            )
          )
        )
      )
    )
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KanbanViewActions.setCurrentTaskId),
      switchMap((action) =>
        this.tasksService.get(action.taskId).pipe(
          map((task) => YataApiActions.loadTaskSuccess({ task })),
          catchError(() =>
            of(YataApiActions.loadTaskError({ message: 'Could not load Task' }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KanbanViewActions.updateTask),
      concatMap((action) =>
        this.tasksService.update(action.task).pipe(
          map((task) => YataApiActions.updateTaskSuccess({ task })),
          catchError(() =>
            of(
              YataApiActions.updateTaskError({
                message: 'Could not update Task',
              })
            )
          )
        )
      )
    )
  );
}
