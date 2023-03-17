import { Store } from '@ngrx/store';
import { catchError, of, tap } from 'rxjs';
import { AuthActions } from '../store/actions';
import { AuthApiActions } from '../store/actions/auth-api.actions';
import { AuthenticationService } from './services/authentication.service';

export function initAppFactory(
  store: Store,
  authService: AuthenticationService
) {
  store.dispatch(AuthActions.refreshToken());

  return () =>
    authService.refreshToken().pipe(
      tap((res) =>
        store.dispatch(
          AuthApiActions.refreshTokenSuccess({
            res,
          })
        )
      ),
      catchError(() => of())
    );
}
