import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthDto } from '../../auth/dto/auth.dto';

export const AuthActions = createActionGroup({
  source: 'Authentication',
  events: {
    'Authentication Complete': emptyProps(),
    'Sign In': props<{ dto: AuthDto }>(),
    'Sign Up': props<{ dto: AuthDto }>(),
    'Refresh Token': emptyProps(),
  },
});
