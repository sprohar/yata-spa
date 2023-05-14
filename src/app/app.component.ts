import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { UserPreference } from './auth/models/user.model';
import { selectUserPreferences } from './store/selectors';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  private readonly lightThemeCssClass = 'light-theme';
  private readonly preferences$ = this.store.select(selectUserPreferences);

  @HostBinding('class') classAttribute = '';

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.preferences$
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((prefs: UserPreference | null) => {
        if (prefs && prefs.isDarkTheme !== undefined) {
          this.classAttribute = prefs.isDarkTheme
            ? ''
            : this.lightThemeCssClass;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
