import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { YataApiActions } from '../actions';

@Injectable()
export class AppEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly snackbar: MatSnackBar
  ) {}

  apiError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(YataApiActions.serverError),
        map(({ error }) => {
          if (Array.isArray(error.message)) {
            const message = error.message.join('\n');
            return this.snackbar.open(message);
          }
          return this.snackbar.open(error.message ?? 'An error occurred');
        })
      ),
    { dispatch: false }
  );
}
