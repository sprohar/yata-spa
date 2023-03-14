import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { ApiErrorResponse } from '../../interfaces/api-error-response';
import { SubtasksService } from '../../services/subtasks.service';
import { TaskDetailsActions, YataApiActions } from '../actions';

@Injectable()
export class SubtasksEffects {
  constructor(
    private actions$: Actions,
    private subtasksService: SubtasksService,
    private snackbar: MatSnackBar
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskDetailsActions.createSubtask),
      concatMap((action) =>
        this.subtasksService.create(action.subtask).pipe(
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

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskDetailsActions.deleteSubtask),
      concatMap((action) =>
        this.subtasksService.delete(action.subtask).pipe(
          map(() =>
            YataApiActions.deleteSubtaskSuccess({ subtask: action.subtask })
          ),
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

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskDetailsActions.updateSubtask),
      concatMap((action) =>
        this.subtasksService.update(action.subtask).pipe(
          map((subtask) => YataApiActions.updateSubtaskSuccess({ subtask })),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.updateSubtaskError({
                error,
              })
            )
          )
        )
      )
    )
  );
}
