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
  take,
  tap,
} from 'rxjs';
import { AuthResponseDto } from '../../auth/dto';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { ApiErrorResponse } from '../../error/api-error-response';
import { ErrorService } from '../../services/error.service';
import { OAuthService } from '../../services/oauth.service';
import { AuthActions } from '../actions';
import { AuthApiActions } from '../actions/auth-api.actions';
import { OAuthActions } from '../actions/oauth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authenticationService: AuthenticationService,
    private oauth: OAuthService,
    private errorService: ErrorService
  ) {}

  google$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OAuthActions.signInWithGoogle),
      take(1),
      switchMap((action) =>
        this.oauth.signInWithGoogle(action.payload).pipe(
          map((res: AuthResponseDto) => AuthApiActions.signInSuccess({ res })),
          tap(() => this.router.navigateByUrl(action.returnUrl)),
          catchError((error: ApiErrorResponse) =>
            of(AuthApiActions.signInError({ error }))
          )
        )
      )
    )
  );

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
      take(1),
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
      ofType(AuthApiActions.signInError, AuthApiActions.signUpError),
      tap((action) => {
        const error = action.error;
        console.log(error);
        if (
          error.statusCode &&
          error.statusCode === HttpStatusCode.Unauthorized
        ) {
          if (typeof error.message === 'string') {
            this.errorService.setErrorMessage(
              error.message ?? 'Invalid credentials'
            );
          } else if (Array.isArray(error.message)) {
            this.errorService.setErrorMessage(
              error.message.join('\n') ?? 'Invalid credentials'
            );
          }
        }
      }),
      switchMap((_) => {
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
          map((res) =>
            AuthApiActions.signInSuccess({ res, returnUrl: action.returnUrl })
          ),
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
      concatMap((action) => {
        this.router.navigateByUrl(action.returnUrl ?? '/app');
        return of(AuthActions.authFlowComplete());
      })
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      concatMap((action) =>
        this.authenticationService.signUp(action.dto).pipe(
          map((res) =>
            AuthApiActions.signUpSuccess({ res, returnUrl: action.returnUrl })
          ),
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
