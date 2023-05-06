import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskView } from '../../interfaces';
import { Task } from '../../models';
import {
  selectTasksGroupByProjectSections,
  selectUserPreferences,
} from '../../store/selectors';

@Component({
  selector: 'yata-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent {
  readonly TASK_VIEW_MINIMALIST = TaskView.MINIMALIST;
  readonly TASK_VIEW_INFORMATIVE = TaskView.INFORMATIVE;
  readonly userPreferences$ = this.store.select(selectUserPreferences);
  readonly group$ = this.store.select(selectTasksGroupByProjectSections);

  constructor(private readonly store: Store) {}

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }
}
