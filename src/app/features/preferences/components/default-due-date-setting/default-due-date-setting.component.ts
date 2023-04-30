import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { UserPreference } from '../../../../auth/models/user.model';
import { PreferencesActions } from '../../../../store/actions';
import { selectUserPreferences } from '../../../../store/selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'yata-default-due-date-setting',
  template: `
    <div class="flex space-between">
      <p>Set "Today" as default due date</p>
      <mat-slide-toggle
        [formControl]="control"
        #toggleDueDate
        color="primary"
        (change)="handleChange(toggleDueDate.checked)"
      ></mat-slide-toggle>
    </div>
  `,
})
export class DefaultDueDateSetting implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly preferences$ = this.store.select(selectUserPreferences);
  readonly control = new FormControl(true, { nonNullable: true });
  private preferences: UserPreference | null = null;

  constructor(private readonly store: Store) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.preferences$
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((prefs) => {
        this.preferences = prefs;
        if (prefs && prefs.isDarkTheme !== undefined) {
          this.control.setValue(prefs.isDarkTheme);
        }
      });
  }

  handleChange(checked: boolean) {
    this.store.dispatch(
      PreferencesActions.update({
        preferences: {
          ...this.preferences,
          defaultDueDateToday: checked,
        },
      })
    );
  }
}
