import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { User } from '../../auth/models/user.model';
import { ApiErrorResponse } from '../../error';
import { UsersService } from '../../services';
import { PreferencesService } from '../../settings/services/preferences.service';
import { SettingsActions, YataApiActions } from '../actions';

@Injectable()
export class SettingsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly preferences: PreferencesService,
    private readonly usersService: UsersService,
    private readonly snackbar: MatSnackBar
  ) {}

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.updateUserPreferences),
      concatMap(({ preferences }) =>
        this.usersService.update({ preferences } as Partial<User>).pipe(
          map((user) => {
            this.preferences.set(user.preferences ?? {});
            this.snackbar.open('Saved!');
            return YataApiActions.updateUserPreferenceSuccess({ user });
          }),
          catchError((error: ApiErrorResponse) =>
            of(YataApiActions.updateUserPreferenceError({ error }))
          )
        )
      )
    )
  );
}
