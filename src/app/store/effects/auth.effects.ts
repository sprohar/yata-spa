import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { ApiErrorResponse } from '../../interfaces/api-error-response';
import { ErrorService } from '../../services/error.service';
import { AuthActions } from '../actions';
import { AuthApiActions } from '../actions/auth-api.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authenticationService: AuthenticationService,
    private errorService: ErrorService
  ) {}

  logoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.logoutSuccess),
      exhaustMap((_action) => {
        this.router.navigateByUrl('/auth/sign-in');
        return of(AuthActions.authFlowComplete());
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap((_action) =>
        this.authenticationService.logout().pipe(
          map(() => AuthApiActions.logoutSuccess()),
          catchError((error: ApiErrorResponse) =>
            of(AuthApiActions.logoutError({ error }))
          )
        )
      )
    )
  );

  authError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthApiActions.signInError,
        AuthApiActions.signUpError
        // AuthApiActions.refreshTokenError
      ),
      tap((action) => {
        const error = action.error;
        console.log(error);
        if (
          error.statusCode &&
          error.statusCode === HttpStatusCode.Unauthorized
        ) {
          console.log('error service');
          this.errorService.setErrorMessage('Invalid credentials');
        }
      }),
      switchMap((_) => {
        // this.router.navigateByUrl('/auth/sign-in');
        return of(AuthActions.authFlowComplete());
      })
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap((action) =>
        this.authenticationService.refreshToken().pipe(
          map((res) => AuthApiActions.refreshTokenSuccess({ res })),
          tap(() => {
            if (action.returnUrl) {
              this.router.navigateByUrl(action.returnUrl);
            }
          }),
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
      switchMap((action) =>
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

  authSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.signInSuccess, AuthApiActions.signUpSuccess),
      concatMap((_action) => {
        this.router.navigateByUrl('/app');
        return of(AuthActions.authFlowComplete());
      })
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
