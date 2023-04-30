import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { User } from '../../auth/models/user.model';
import { UsersService } from '../../services/http';
import { PreferencesActions, YataApiActions } from '../actions';

@Injectable()
export class PreferencesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly usersService: UsersService,
    private readonly snackbar: MatSnackBar
  ) {}

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferencesActions.updateUserPreferences),
      concatMap(({ preferences }) =>
        this.usersService.update({ preferences } as Partial<User>).pipe(
          map((user) => {
            this.snackbar.open('Saved!');
            return YataApiActions.updateUserPreferenceSuccess({ user });
          }),
          catchError((error: HttpErrorResponse) =>
            of(YataApiActions.serverError({ error }))
          )
        )
      )
    )
  );
}
