import { User } from '../../auth/models/user.model';
import { AuthResponseDto } from '../../auth/dto/auth-response.dto';
import { AuthApiActions } from '../actions/auth-api.actions';
import * as fromAuth from './auth.reducer';
import { ApiErrorResponse } from '../../error';

describe('Auth Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialAuthState } = fromAuth;
      const action = {} as any;
      const state = fromAuth.reducer(undefined, action);

      expect(state).toBe(initialAuthState);
    });
  });

  describe('signInSuccess', () => {
    it('should set the user and access token', () => {
      const { initialAuthState } = fromAuth;
      const user: User = {
        id: 1,
        email: 'testuser@yata.app',
      };

      const payload: AuthResponseDto = {
        user,
        accessToken: 'jwt',
      };

      const action = AuthApiActions.signInSuccess({
        res: payload,
      });

      const state = fromAuth.reducer(initialAuthState, action);

      expect(state).toEqual({
        ...initialAuthState,
        user,
        accessToken: payload.accessToken,
      });
    });
  });

  describe('signUpSuccess', () => {
    it('should set the user and access token', () => {
      const { initialAuthState } = fromAuth;
      const user: User = {
        id: 1,
        email: 'testuser@yata.app',
      };

      const payload: AuthResponseDto = {
        user,
        accessToken: 'jwt',
      };

      const action = AuthApiActions.signUpSuccess({
        res: payload,
      });

      const state = fromAuth.reducer(initialAuthState, action);

      expect(state).toEqual({
        ...initialAuthState,
        user,
        accessToken: payload.accessToken,
      });
    });
  });

  describe('refreshTokenSucess', () => {
    it('should set the user and access token', () => {
      const { initialAuthState } = fromAuth;
      const user: User = {
        id: 1,
        email: 'testuser@yata.app',
      };

      const payload: AuthResponseDto = {
        user,
        accessToken: 'jwt',
      };

      const action = AuthApiActions.refreshTokenSuccess({
        res: payload,
      });

      const state = fromAuth.reducer(initialAuthState, action);

      expect(state).toEqual({
        ...initialAuthState,
        user,
        accessToken: payload.accessToken,
      });
    });
  });

  describe('logoutSuccess', () => {
    it('should set the user and access token to null and isAuthenticated to false', () => {
      const { initialAuthState } = fromAuth;

      const action = AuthApiActions.logoutSuccess();

      const state = fromAuth.reducer(initialAuthState, action);

      expect(state).toEqual({
        accessToken: null,
        user: null,
      });
    });
  });

  describe('signInError', () => {
    it('should set the accessToken and user to null', () => {
      const { initialAuthState } = fromAuth;
      const error: ApiErrorResponse = {
        error: 'error',
      };

      const action = AuthApiActions.signInError({ error });
      const state = fromAuth.reducer(initialAuthState, action);

      expect(state).toEqual({
        accessToken: null,
        user: null,
      });
    });
  });

  describe('signUpError', () => {
    it('should set the accessToken and user to null', () => {
      const { initialAuthState } = fromAuth;
      const error: ApiErrorResponse = {
        error: 'error',
      };

      const action = AuthApiActions.signUpError({ error });
      const state = fromAuth.reducer(initialAuthState, action);

      expect(state).toEqual({
        accessToken: null,
        user: null,
      });
    });
  });

  describe('refreshTokenError', () => {
    it('should set the accessToken and user to null', () => {
      const { initialAuthState } = fromAuth;
      const error: ApiErrorResponse = {
        error: 'error',
      };

      const action = AuthApiActions.refreshTokenError({ error });
      const state = fromAuth.reducer(initialAuthState, action);

      expect(state).toEqual({
        accessToken: null,
        user: null,
      });
    });
  });
});
