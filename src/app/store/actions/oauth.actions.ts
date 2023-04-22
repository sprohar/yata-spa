import { createActionGroup, props } from '@ngrx/store';
import { GoogleOAuthDto } from '../../auth/dto';

export const OAuthActions = createActionGroup({
  source: 'OAuth',
  events: {
    'Sign In With Google': props<{
      payload: GoogleOAuthDto;
      returnUrl: string;
    }>(),
  },
});
