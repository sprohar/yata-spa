import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of, shareReplay, take } from 'rxjs';
import { environment } from '../environment/environment';
import { AuthenticationService } from './auth/services/authentication.service';
import { ApiErrorResponse } from './error';
import { AuthApiActions } from './store/actions/auth-api.actions';

export function appInitFactory(
  store: Store,
  auth: AuthenticationService,
  router: Router
) {
  const url = window.location.href as string; // "http://localhost:4200/app"
  const token = url.substring(url.lastIndexOf(':')); // ":4200/app"
  const path = token.substring(token.indexOf('/')); // "/app"
  const isAuthInProcess = environment.auth.endpoints.some((endpoint) =>
    path.includes(endpoint)
  );

  const returnUrl = !isAuthInProcess ? path : '/app';

  return () =>
    auth.refreshToken(returnUrl).pipe(
      take(1),
      shareReplay(),
      map((res) => {
        router.navigateByUrl(returnUrl);
        return store.dispatch(
          AuthApiActions.refreshTokenSuccess({
            res,
          })
        );
      }),
      catchError((error: ApiErrorResponse) =>
        of(
          AuthApiActions.refreshTokenError({
            error,
          })
        )
      )
    );
}
