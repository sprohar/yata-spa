import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../../../models';
import { selectTodaysTasks } from '../../../../store/selectors';

@Component({
  selector: 'yata-todays-tasks',
  templateUrl: './todays-tasks.component.html',
  styleUrls: ['./todays-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodaysTasksComponent {
  readonly tasks$ = this.store.select(selectTodaysTasks);
  readonly today = new Date();

  constructor(private readonly store: Store) {}

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }
}
