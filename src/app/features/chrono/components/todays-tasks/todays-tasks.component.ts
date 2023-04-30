import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskView } from '../../../../interfaces';
import { Task } from '../../../../models';
import {
  selectTasks,
  selectUserPreferences,
} from '../../../../store/selectors';

@Component({
  selector: 'yata-todays-tasks',
  templateUrl: './todays-tasks.component.html',
  styleUrls: ['./todays-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodaysTasksComponent {
  readonly TASK_VIEW_MINIMALIST = TaskView.MINIMALIST;
  readonly TASK_VIEW_INFORMATIVE = TaskView.INFORMATIVE;
  readonly preferences$ = this.store.select(selectUserPreferences);
  readonly today = new Date();
  readonly tasks$ = this.store.select(selectTasks);

  constructor(private readonly store: Store) {}

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }
}
