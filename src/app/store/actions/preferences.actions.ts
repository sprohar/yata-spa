import { createActionGroup, props } from '@ngrx/store';
import { UserPreference } from '../../auth/models/user.model';

export const PreferencesActions = createActionGroup({
  source: 'Preferences',
  events: {
    Update: props<{ preferences: UserPreference }>(),
  },
});
