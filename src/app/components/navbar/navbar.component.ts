import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { UserPreference } from '../../auth/models/user.model';
import { BreakpointService } from '../../services';
import { ThemeService } from '../../services/theme.service';
import { PreferencesActions } from '../../store/actions';
import { selectUserPreferences } from '../../store/selectors';

@Component({
  selector: 'yata-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule],
})
export class NavbarComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly userPreferences$ = this.store.select(selectUserPreferences);
  readonly isHandset$ = this.breakpointService.isHandset$;
  readonly isDarkTheme$ = this.themeService.isDarkTheme$;

  @Output() readonly toggleSidenav = new EventEmitter<void>();

  constructor(
    private readonly themeService: ThemeService,
    private readonly breakpointService: BreakpointService,
    private readonly store: Store
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  handleToggleTheme() {
    this.userPreferences$
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe((preferences: UserPreference | null) => {
        if (preferences === null) return;

        this.store.dispatch(
          PreferencesActions.update({
            preferences: {
              ...preferences,
              isDarkTheme: !preferences.isDarkTheme,
            },
          })
        );
      });
  }

  handleToggleSidenav() {
    this.toggleSidenav.emit();
  }
}
