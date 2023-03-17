import { createActionGroup, props } from "@ngrx/store";
import { AuthResponseDto } from "../../auth/dto/auth-response.dto";
import { ApiErrorResponse } from "../../interfaces/api-error-response";

export const AuthApiActions = createActionGroup({
  source: 'Auth Api',
  events: {
    'Sign In Success': props<{ res: AuthResponseDto }>(),
    'Sign In Error': props<{ error: ApiErrorResponse }>(),
    'Sign Up Success': props<{ res: AuthResponseDto }>(),
    'Sign Up Error': props<{ error: ApiErrorResponse }>(),
    'Refresh Token Success': props<{ res: AuthResponseDto }>(),
    'Refresh Token Error': props<{ error: ApiErrorResponse }>(),
  }
});