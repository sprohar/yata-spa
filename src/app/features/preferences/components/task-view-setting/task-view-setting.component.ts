import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { UserPreference } from '../../../../auth/models/user.model';
import { TaskView } from '../../../../interfaces';
import { PreferencesActions } from '../../../../store/actions';
import { selectUserPreferences } from '../../../../store/selectors';

@Component({
  selector: 'yata-task-view-setting',
  templateUrl: './task-view-setting.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatRadioModule, ReactiveFormsModule],
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
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((value: TaskView) => this.handleChange(value));
  }

  handleChange(value: TaskView) {
    this.store.dispatch(
      PreferencesActions.update({
        preferences: {
          ...this.preferences,
          taskView: value,
        },
      })
    );
  }
}
