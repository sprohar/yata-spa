import { createFeature, createReducer, on } from '@ngrx/store';
import { UserPreference } from '../../auth/models/user.model';
import { SettingsActions, YataApiActions } from '../actions';

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
    on(YataApiActions.updateUserPreferenceSuccess, (state, action) => ({
      ...state,
      preferences: action.user.preferences ?? null,
    })),
    on(SettingsActions.setUserPreferences, (state, action) => ({
      ...state,
      preferences: action.preferences,
    }))
  ),
});

export const { selectPreferences, selectSettingsState, name, reducer } =
  settingsFeature;
