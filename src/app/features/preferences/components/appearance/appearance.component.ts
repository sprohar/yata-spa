import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { UserPreference } from '../../../../auth/models/user.model';
import { selectUserPreferences } from '../../../../store/selectors';

@Component({
  selector: 'yata-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppearanceComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly control = new FormControl(true, {
    nonNullable: true,
  });

  preferences$ = this.store.select(selectUserPreferences);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.preferences$
      .pipe(takeUntil(this.destroy$))
      .subscribe((preferences: UserPreference | null) => {
        if (preferences && preferences.isDarkTheme !== undefined) {
          this.control.setValue(preferences.isDarkTheme);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
