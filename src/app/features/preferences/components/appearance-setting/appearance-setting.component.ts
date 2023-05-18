import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { UserPreference } from '../../../../auth/models/user.model';
import { PreferencesActions } from '../../../../store/actions';
import { selectUserPreferences } from '../../../../store/selectors';

@Component({
  selector: 'yata-appearance-setting',
  templateUrl: './appearance-setting.component.html',
  styleUrls: ['./appearance-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatCardModule, MatSlideToggleModule, ReactiveFormsModule],
})
export class AppearanceSettingComponent implements OnDestroy, OnInit {
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
