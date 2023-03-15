import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap } from 'rxjs';
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
      ofType(AuthApiActions.signInSuccess, AuthApiActions.signUpSuccess),
      switchMap((_) => {
        this.router.navigateByUrl('/');
        return of(AuthActions.authenticationComplete());
      })
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      mergeMap(() =>
        this.authenticationService.refreshToken().pipe(
          map((res) => AuthApiActions.refreshTokenSuccess({ res })),
          catchError((error: ApiErrorResponse) =>
            of(AuthApiActions.refreshTokenError({ error }))
          )
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      mergeMap((action) =>
        this.authenticationService.signIn(action.dto).pipe(
          map((res) => AuthApiActions.signInSuccess({ res })),
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
          map((res) => AuthApiActions.signUpSuccess({ res })),
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
