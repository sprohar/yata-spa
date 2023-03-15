import { createActionGroup, props } from "@ngrx/store";
import { AuthResponseDto } from "../../auth/dto/auth-response.dto";
import { ApiErrorResponse } from "../../interfaces/api-error-response";

export const AuthApiActions = createActionGroup({
  source: 'Auth Api',
  events: {
    'Sign In Sucess': props<{ res: AuthResponseDto }>(),
    'Sign In Error': props<{ error: ApiErrorResponse }>(),
    'Sign Up Sucess': props<{ res: AuthResponseDto }>(),
    'Sign Up Error': props<{ error: ApiErrorResponse }>(),
  }
});
