import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../auth/models/user.model';
import { AuthApiActions } from '../actions/auth-api.actions';

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(
      AuthApiActions.signInSuccess,
      AuthApiActions.refreshTokenSuccess,
      AuthApiActions.signUpSuccess,
      (state, action) => ({
        ...state,
        accessToken: action.res.accessToken,
        isAuthenticated: true,
      })
    )
  ),
});

export const {
  name,
  reducer,
  selectAccessToken,
  selectAuthState,
  selectIsAuthenticated,
  selectUser,
} = authFeature;
