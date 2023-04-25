import { createActionGroup, props } from '@ngrx/store';
import { UserPreference } from '../../auth/models/user.model';

export const SettingsActions = createActionGroup({
  source: 'Settings',
  events: {
    'Set User Preferences': props<{ preferences: UserPreference }>(),
    'Update User Preferences': props<{
      preferences: UserPreference;
    }>(),
  },
});
