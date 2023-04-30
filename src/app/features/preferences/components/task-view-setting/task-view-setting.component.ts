import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserPreference } from '../../../../auth/models/user.model';
import { TaskView } from '../../../../interfaces';
import { PreferencesActions } from '../../../../store/actions';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'yata-task-view-setting',
  templateUrl: './task-view-setting.component.html',
  styleUrls: ['./task-view-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskViewSettingComponent implements OnInit {
  readonly VIEW_MINIMALIST = TaskView.MINIMALIST;
  readonly VIEW_INFORMATIVE = TaskView.INFORMATIVE;
  readonly taskViewControl = new FormControl(this.VIEW_MINIMALIST);

  constructor(
    private readonly store: Store,
    private readonly preferences: PreferencesService
  ) {}

  ngOnInit(): void {
    const userPrefs: UserPreference | null = this.preferences.get();
    if (userPrefs && userPrefs.taskView) {
      this.taskViewControl.setValue(userPrefs.taskView);
    }
  }

  handleChange() {
    const taskView = this.taskViewControl.value as number;
    const prefs: UserPreference | null = this.preferences.get();

    this.store.dispatch(
      PreferencesActions.updateUserPreferences({
        preferences: {
          taskView,
        },
      })
    );
  }
}
