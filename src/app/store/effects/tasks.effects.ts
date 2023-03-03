import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, switchMap, tap } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import {
  CreateTaskActions,
  KanbanViewActions,
  TaskDetailsActions,
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
      ofType(
        KanbanViewActions.updateTask,
        TaskDetailsActions.updateTask,
        TaskDetailsActions.moveTaskToProject
      ),
      concatMap((action) =>
        this.tasksService.update(action.task).pipe(
          map((task) => YataApiActions.updateTaskSuccess({ task })),
          tap(() => this.snackbar.open('Updated task')),
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

  // moveTaskToProject$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TaskDetailsActions.moveTaskToProject),
  //     concatMap((action) =>
  //       this.tasksService.update(action.task).pipe(
  //         map((task) => {
  //           this.snackbar.open(`Update successful.`);
  //           return YataApiActions.moveTaskToProjectSuccess({ task });
  //         }),
  //         catchError(() =>
  //           of(
  //             YataApiActions.moveTaskToProjectError({
  //               message: 'Could not update the Task',
  //             })
  //           )
  //         )
  //       )
  //     )
  //   )
  // );
}
