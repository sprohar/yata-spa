import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../../models';
import { TasksOrderByOptions } from '../../../store/actions/tasks-order-by-options.actions';

@Component({
  selector: 'yata-tasks-order-by-options',
  templateUrl: './tasks-order-by-options.component.html',
  styleUrls: ['./tasks-order-by-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksOrderByOptionsComponent {
  constructor(private store: Store) {}

  orderByDueDate() {
    this.store.dispatch(
      TasksOrderByOptions.setOrderBy({
        orderBy: Task.OrderBy.DUE_DATE,
      })
    );
  }

  orderByPriority() {
    this.store.dispatch(
      TasksOrderByOptions.setOrderBy({
        orderBy: Task.OrderBy.PRIORITY,
      })
    );
  }
}
