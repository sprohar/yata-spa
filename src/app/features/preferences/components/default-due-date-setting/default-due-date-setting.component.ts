import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserPreference } from '../../../../auth/models/user.model';
import { PreferencesActions } from '../../../../store/actions';
import { PreferencesService } from '../../services/preferences.service';

@Component({
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
export class DefaultDueDateSetting implements OnInit {
  readonly control = new FormControl();

  constructor(
    private readonly preferences: PreferencesService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    const prefs: UserPreference | null = this.preferences.get();
    this.control.setValue(prefs?.defaultDueDateToday ?? false);
  }

  handleChange(checked: boolean) {
    const preferences: UserPreference | null = this.preferences.get();
    if (preferences) {
      preferences.defaultDueDateToday = checked;
    }

    this.store.dispatch(
      PreferencesActions.updateUserPreferences({
        preferences: {
          defaultDueDateToday: checked,
        }
      })
    );
  }
}
