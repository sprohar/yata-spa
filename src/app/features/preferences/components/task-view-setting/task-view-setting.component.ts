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
import { TaskView } from '../../../../interfaces';
import { PreferencesActions } from '../../../../store/actions';
import { selectUserPreferences } from '../../../../store/selectors';

@Component({
  selector: 'yata-task-view-setting',
  templateUrl: './task-view-setting.component.html',
  styleUrls: ['./task-view-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskViewSettingComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly VIEW_MINIMALIST = TaskView.MINIMALIST;
  readonly VIEW_INFORMATIVE = TaskView.INFORMATIVE;
  readonly preferences$ = this.store.select(selectUserPreferences);
  readonly control = new FormControl(TaskView.MINIMALIST, {
    nonNullable: true,
  });
  private preferences: UserPreference | null = null;

  constructor(private readonly store: Store) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.preferences$.pipe(takeUntil(this.destroy$)).subscribe((prefs) => {
      this.preferences = prefs;
      if (prefs && prefs.taskView !== undefined) {
        this.control.setValue(prefs.taskView);
      }
    });

    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: TaskView) => this.handleChange(value));
  }

  handleChange(value: TaskView) {
    this.store.dispatch(
      PreferencesActions.updateUserPreferences({
        preferences: {
          ...this.preferences,
          taskView: value,
        },
      })
    );
  }
}
