import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, take, tap } from 'rxjs';
import { AuthResponseDto } from '../../auth/dto';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { ApiErrorResponse } from '../../error/api-error-response';
import { ErrorService } from '../../services/error.service';
import { OAuthService } from '../../services/http';
import { AuthActions, AuthApiActions, OAuthActions } from '../actions';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly auth: AuthenticationService,
    private readonly oauth: OAuthService,
    private readonly errorService: ErrorService
  ) {}

  google$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OAuthActions.signInWithGoogle),
      take(1),
      exhaustMap((action) =>
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

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.logoutSuccess),
        tap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      take(1),
      switchMap((_action) =>
        this.auth.logout().pipe(
          map(() => AuthApiActions.logoutSuccess()),
          catchError((error: ApiErrorResponse) =>
            of(AuthApiActions.logoutError({ error }))
          )
        )
      )
    )
  );

  authError$ = createEffect(
    () =>
      this.actions$.pipe(
        // TODO: Handle: refreshTokenError
        ofType(AuthApiActions.signInError, AuthApiActions.signUpError),
        tap((action) => {
          const error = action.error;
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
        })
      ),
    { dispatch: false }
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      exhaustMap((action) =>
        this.auth.refreshToken().pipe(
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
      exhaustMap((action) =>
        this.auth.signIn(action.dto).pipe(
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

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      exhaustMap((action) =>
        this.auth.signUp(action.dto).pipe(
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

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.signInSuccess, AuthApiActions.signUpSuccess),
        tap((action) => {
          this.router.navigateByUrl(action.returnUrl ?? '/app');
        })
      ),
    { dispatch: false }
  );
}
