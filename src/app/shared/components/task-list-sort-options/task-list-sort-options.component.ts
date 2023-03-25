import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskListSortOptionsActions } from 'src/app/store/actions/task-list-sort-options.actions';

@Component({
  selector: 'yata-task-list-sort-options',
  templateUrl: './task-list-sort-options.component.html',
  styleUrls: ['./task-list-sort-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListSortOptionsComponent {
  constructor(private store: Store) {}

  sortByCreatedAt() {
    this.store.dispatch(TaskListSortOptionsActions.sortByCreatedAt());
  }
}
