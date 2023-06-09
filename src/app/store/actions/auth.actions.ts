import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthDto } from '../../auth/dto/auth.dto';

export const AuthActions = createActionGroup({
  source: 'Authentication',
  events: {
    'Auth Flow Complete': emptyProps(),
    'Sign In': props<{ dto: AuthDto; returnUrl: string }>(),
    'Sign Up': props<{ dto: AuthDto; returnUrl: string }>(),
    'Refresh Token': props<{ returnUrl?: string }>(),
    'Logout': emptyProps(),
  },
});
