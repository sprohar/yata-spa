import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../services';
import { Preferences, PreferencesOption } from '../models';

const PREFERENCES_KEY = 'preferences';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  constructor(private readonly storage: LocalStorageService) {}

  get(key: PreferencesOption) {
    const entry: string | null = this.storage.get(PREFERENCES_KEY);
    if (entry == null) return null;

    const prefs: Preferences = JSON.parse(entry);
    return prefs[key];
  }

  set(key: PreferencesOption, value: any) {
    const entry: string | null = this.storage.get(PREFERENCES_KEY);
    const prefs: Preferences = {};

    if (entry == null) {
      prefs[key] = value;
    } else {
      prefs[key] = value;
    }

    this.storage.set(PREFERENCES_KEY, prefs);
  }
}
