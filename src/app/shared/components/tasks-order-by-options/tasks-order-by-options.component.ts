import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TasksOrderByOptions } from '../../../store/actions/tasks-order-by-options.actions';

@Component({
  selector: 'yata-tasks-order-by-options',
  templateUrl: './tasks-order-by-options.component.html',
  styleUrls: ['./tasks-order-by-options.component.css'],
})
export class TasksOrderByOptionsComponent {
  constructor(private store: Store) {}

  orderByDueDate() {
    this.store.dispatch(TasksOrderByOptions.orderByDueDate());
  }

  orderByPriority() {
    this.store.dispatch(TasksOrderByOptions.orderByPriority());
  }
}
