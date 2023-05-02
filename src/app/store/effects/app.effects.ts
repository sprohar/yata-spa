import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
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
        tap(({ error }) => {
          if (error.status === HttpStatusCode.TooManyRequests) {
            this.snackbar.open('Too many requests! Wait one minute.', 'OK', {
              duration: undefined,
            });
          } else {
            this.snackbar.open(error.statusText, 'OK', {
              duration: undefined,
            });
          }
        })
      ),
    { dispatch: false }
  );
}
