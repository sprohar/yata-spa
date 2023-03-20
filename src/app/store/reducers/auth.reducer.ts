import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../auth/models/user.model';
import { AuthApiActions } from '../actions/auth-api.actions';

export interface AuthState {
  accessToken: string | null;
  user: User | null;
}

export const initialAuthState: AuthState = {
  accessToken: null,
  user: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialAuthState,
    on(AuthApiActions.logoutSuccess, (_state, _action) => ({
      accessToken: null,
      isAuthenticated: false,
      user: null,
    })),
    on(
      AuthApiActions.signInSuccess,
      AuthApiActions.refreshTokenSuccess,
      AuthApiActions.signUpSuccess,
      (_state, action) => ({
        user: action.res.user ?? null,
        accessToken: action.res.accessToken,
      })
    ),
    on(
      AuthApiActions.signInError,
      AuthApiActions.signUpError,
      AuthApiActions.refreshTokenError,
      (_state, _action) => ({
        accessToken: null,
        user: null,
      })
    )
  ),
});

export const { name, reducer, selectAccessToken, selectAuthState, selectUser } =
  authFeature;
