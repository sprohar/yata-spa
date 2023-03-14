import { createActionGroup, props } from '@ngrx/store';
import { AuthResponseDto } from '../../auth/dto/auth-response.dto';
import { AuthDto } from '../../auth/dto/auth.dto';
import { ApiErrorResponse } from '../../interfaces/api-error-response';

export const AuthActions = createActionGroup({
  source: 'Authentication',
  events: {
    'Sign In': props<{ dto: AuthDto }>(),
    'Sign In Sucesss': props<{ res: AuthResponseDto }>(),
    'Sign In Error': props<{ error: ApiErrorResponse }>(),
    'Sign Up': props<{ dto: AuthDto }>(),
    'Sign Up Sucesss': props<{ res: AuthResponseDto }>(),
    'Sign Up Error': props<{ error: ApiErrorResponse }>(),
  },
});
