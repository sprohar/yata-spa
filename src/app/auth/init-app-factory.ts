import { Store } from '@ngrx/store';
import { environment } from '../../environment/environment';
import { AuthActions } from '../store/actions';

export function initAppFactory(store: Store) {
  const url = window.location.href as string; // "http://localhost:4200/app"
  const token = url.substring(url.lastIndexOf(':')); // ":4200/app"
  const path = token.substring(token.indexOf('/')); // "/app"
  const isAuthInProcess = environment.auth.endpoints.some((endpoint) =>
    path.includes(endpoint)
  );
  const returnUrl = !isAuthInProcess ? path : undefined;

  return () =>
    store.dispatch(
      AuthActions.refreshToken({
        returnUrl,
      })
    );
}
