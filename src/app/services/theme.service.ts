import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, shareReplay } from 'rxjs';
import { UserPreference } from '../auth/models/user.model';
import { selectUserPreferences } from '../store/selectors';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDarkTheme$: Observable<boolean> = this.store
    .select(selectUserPreferences)
    .pipe(
      map((prefs: UserPreference | null) => {
        if (prefs !== null && prefs.isDarkTheme !== undefined)
          return prefs.isDarkTheme;
        return false;
      }),
      shareReplay()
    );

  constructor(private readonly store: Store) {}

  toggleTheme() {}
}
