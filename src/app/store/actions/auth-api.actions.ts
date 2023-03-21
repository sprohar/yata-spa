import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthResponseDto } from '../../auth/dto/auth-response.dto';
import { ApiErrorResponse } from '../../interfaces/api-error-response';

export const AuthApiActions = createActionGroup({
  source: 'Auth Api',
  events: {
    'Sign In Success': props<{ res: AuthResponseDto; returnUrl?: string }>(),
    'Sign In Error': props<{ error: ApiErrorResponse }>(),
    'Sign Up Success': props<{ res: AuthResponseDto; returnUrl?: string }>(),
    'Sign Up Error': props<{ error: ApiErrorResponse }>(),
    'Refresh Token Success': props<{ res: AuthResponseDto }>(),
    'Refresh Token Error': props<{ error: ApiErrorResponse }>(),
    'Logout Success': emptyProps(),
    'Logout Error': props<{ error: ApiErrorResponse }>(),
  },
});
