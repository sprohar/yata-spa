import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { REFRESH_TOKEN_KEY } from '../../auth/constants/storage-keys';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { ApiErrorResponse } from '../../interfaces/api-error-response';
import { AuthActions } from '../actions';
import { AuthApiActions } from '../actions/auth-api.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  authenticated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.signInSucess, AuthApiActions.signUpSucess),
      switchMap((action) => {
        localStorage.setItem(REFRESH_TOKEN_KEY, action.res.refreshToken);
        this.router.navigateByUrl('/');
        return of(AuthActions.authenticationCompleted());
      })
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      concatMap((action) =>
        this.authenticationService.signIn(action.dto).pipe(
          map((res) => AuthApiActions.signInSucess({ res })),
          catchError((error: ApiErrorResponse) =>
            of(
              AuthApiActions.signInError({
                error,
              })
            )
          )
        )
      )
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      concatMap((action) =>
        this.authenticationService.signUp(action.dto).pipe(
          map((res) => AuthApiActions.signUpSucess({ res })),
          catchError((error: ApiErrorResponse) =>
            of(
              AuthApiActions.signUpError({
                error,
              })
            )
          )
        )
      )
    )
  );
}
