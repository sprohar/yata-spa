import { Store } from '@ngrx/store';
import { AuthActions } from '../store/actions';

export function initAppFactory(store: Store) {
  return () => store.dispatch(AuthActions.refreshToken());
}
