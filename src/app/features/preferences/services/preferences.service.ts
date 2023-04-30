import { Injectable } from '@angular/core';
import { UserPreference } from '../../../auth/models/user.model';
import { StorageKeys, StorageService } from '../../../services';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  constructor(private readonly storage: StorageService) {}

  get(): UserPreference | null {
    const entry: string | null = this.storage.get(StorageKeys.PREFERENCES);
    if (entry == null) return null;

    return JSON.parse(entry) as UserPreference;
  }

  set(prefs: UserPreference) {
    this.storage.set(StorageKeys.PREFERENCES, JSON.stringify(prefs));
  }
}
