import { createFeature, createReducer } from '@ngrx/store';
import { User } from '../../auth/user';

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
  reducer: createReducer(initialState),
});

export const {
  name,
  reducer,
  selectAuthState,
  selectIsAuthenticated,
  selectUser,
} = authFeature;
