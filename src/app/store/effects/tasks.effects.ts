import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import { SidenavActions, YataApiActions } from '../actions';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
    private snackbar: MatSnackBar
  ) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SidenavActions.projectSelected),
      switchMap(({ projectId }) =>
        this.tasksService.getAll(projectId).pipe(
          map((res) => YataApiActions.loadTasksSuccess({ tasks: res.data })),
          catchError(() =>
            of(
              YataApiActions.loadTasksError({
                message: 'Could not load tasks',
              })
            )
          )
        )
      )
    )
  );
}
