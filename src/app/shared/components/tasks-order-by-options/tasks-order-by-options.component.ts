import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
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
    console.log('Order by due date');
    this.store.dispatch(TasksOrderByOptions.orderByDueDate());
  }

  orderByPriority() {
    console.log('Order by priority');
    this.store.dispatch(TasksOrderByOptions.orderByPriority());
  }
}
