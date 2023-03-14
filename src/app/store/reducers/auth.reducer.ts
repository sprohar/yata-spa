import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../auth/user';
import { AuthActions } from '../actions';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.signInSucesss, (state, _) => ({
      user: state.user,
      isAuthenticated: true,
    }))
  ),
});

export const {
  name,
  reducer,
  selectAuthState,
  selectIsAuthenticated,
  selectUser,
} = authFeature;
