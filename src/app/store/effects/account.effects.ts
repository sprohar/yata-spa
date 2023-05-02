import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { UsersService } from '../../services/http';
import { AccountActions, YataApiActions } from '../actions';

@Injectable()
export class AccountEffects {
  constructor(
    private readonly router: Router,
    private readonly actions$: Actions,
    private readonly usersService: UsersService
  ) {}

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.deleteAccount),
      switchMap(() =>
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
}
