import { createFeature, createReducer, on } from '@ngrx/store';
import { UserPreference } from '../../auth/models/user.model';
import { PreferencesActions, YataApiActions } from '../actions';

export interface SettingsState {
  preferences: UserPreference | null;
}

export const initialSettingsState: SettingsState = {
  preferences: null,
};

export const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialSettingsState,
    on(YataApiActions.updateUserPreferenceSuccess, (_state, action) => ({
      preferences: action.user.preferences ?? null,
    })),
    on(PreferencesActions.setUserPreferences, (_state, action) => ({
      preferences: action.preferences,
    }))
  ),
});

export const { selectPreferences, selectSettingsState, name, reducer } =
  settingsFeature;
