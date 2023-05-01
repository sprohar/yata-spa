import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { UserPreference } from '../../../../auth/models/user.model';
import { PreferencesActions } from '../../../../store/actions';
import { selectUserPreferences } from '../../../../store/selectors';

@Component({
  selector: 'yata-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppearanceComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly preferences$ = this.store.select(selectUserPreferences);
  readonly control = new FormControl(true, {
    nonNullable: true,
  });

  preferences: UserPreference | null = null;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.preferences$
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((preferences: UserPreference | null) => {
        this.preferences = preferences;
        if (preferences && preferences.isDarkTheme !== undefined) {
          this.control.setValue(preferences.isDarkTheme);
        }
      });

    this.control.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((value: boolean) => this.handleChange(value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  handleChange(value: boolean) {
    this.store.dispatch(
      PreferencesActions.update({
        preferences: {
          ...this.preferences,
          isDarkTheme: value,
        },
      })
    );
  }
}
