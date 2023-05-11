import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { UsersService } from '../../services/http';
import { UserActions, YataApiActions } from '../actions';

@Injectable()
export class UsersEffects {
  constructor(
    private readonly router: Router,
    private readonly actions$: Actions,
    private readonly snackbar: MatSnackBar,
    private readonly usersService: UsersService
  ) {}

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      concatMap(() =>
        this.usersService.delete().pipe(
          map(() => YataApiActions.deleteUser()),
          catchError((error: HttpErrorResponse) =>
            of(
              YataApiActions.serverError({
                error,
              })
            )
          )
        )
      )
    )
  );

  deleteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(YataApiActions.deleteUser),
        tap(() => this.router.navigateByUrl('/'))
      ),
    {
      dispatch: false,
    }
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      concatMap((action) =>
        this.usersService.update(action.user).pipe(
          map((user) => {
            this.snackbar.open('Saved!');
            return YataApiActions.updateUserSuccess({ user });
          }),
          catchError((error: HttpErrorResponse) =>
            of(YataApiActions.serverError({ error }))
          )
        )
      )
    )
  );
}
