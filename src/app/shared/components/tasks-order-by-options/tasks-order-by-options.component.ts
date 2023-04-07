import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../../models';
import { TasksOrderByOptionsActions } from '../../../store/actions/tasks-order-by-options.actions';
import { selectOrderBy } from '../../../store/reducers/tasks.reducer';
import { SortOrder } from '../../../strategies/sort';

@Component({
  selector: 'yata-tasks-order-by-options',
  templateUrl: './tasks-order-by-options.component.html',
  styleUrls: ['./tasks-order-by-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksOrderByOptionsComponent {
  readonly SORT_ASC = SortOrder.ASC;
  readonly SORT_DESC = SortOrder.DESC;
  orderBy$ = this.store.select(selectOrderBy);

  constructor(private store: Store) {}

  orderByDueDate(dir: SortOrder) {
    this.store.dispatch(
      TasksOrderByOptionsActions.setOrderBy({
        orderBy: {
          attribute: Task.OrderBy.DUE_DATE,
          dir,
        },
      })
    );
  }

  orderByPriority(dir: SortOrder) {
    this.store.dispatch(
      TasksOrderByOptionsActions.setOrderBy({
        orderBy: {
          attribute: Task.OrderBy.PRIORITY,
          dir,
        },
      })
    );
  }

  defaultSort() {
    this.store.dispatch(TasksOrderByOptionsActions.clearOrderBy());
  }
}
