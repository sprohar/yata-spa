import { createActionGroup, props } from '@ngrx/store';
import { AuthDto } from '../../auth/dto/auth.dto';

export const AuthActions = createActionGroup({
  source: 'Authentication',
  events: {
    'Sign In': props<AuthDto>(),
    'Sign Up': props<AuthDto>(),
  },
});
