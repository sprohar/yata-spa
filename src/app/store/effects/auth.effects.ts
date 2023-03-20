import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, switchMap, tap } from 'rxjs';
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

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap((_action) =>
        this.authenticationService.logout().pipe(
          map(() => AuthApiActions.logoutSuccess()),
          tap(() => this.router.navigateByUrl('/')),
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
        AuthApiActions.signUpError,
        AuthApiActions.refreshTokenError
      ),
      switchMap((_) => {
        this.router.navigateByUrl('/auth/sign-in');
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
              this.router.navigateByUrl(action.returnUrl).then();
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
          tap(() => {
            if (action.returnUrl) {
              this.router.navigateByUrl(action.returnUrl);
            }
          }),
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
