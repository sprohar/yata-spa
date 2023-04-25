import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../../models';
import { StorageService } from '../../../services';
import { TasksOrderByOptionsActions } from '../../../store/actions/tasks-order-by-options.actions';
import {
  selectOrderBy,
  TasksOrderByState,
} from '../../../store/reducers/tasks.reducer';
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
  readonly ORDER_BY_DUE_DATE = Task.OrderBy.DUE_DATE;
  readonly ORDER_BY_PRIORITY = Task.OrderBy.PRIORITY;
  orderBy$ = this.store.select(selectOrderBy);

  constructor(
    private readonly store: Store,
    private readonly storage: StorageService
  ) {}

  handleOrderByChange(attribute: Task.OrderBy, dir: SortOrder) {
    this.storage.set('orderBy', {
      attribute,
      dir,
    } as TasksOrderByState);

    this.store.dispatch(
      TasksOrderByOptionsActions.setOrderBy({
        orderBy: {
          attribute: Task.OrderBy.DUE_DATE,
          dir,
        },
      })
    );
  }

  defaultSort() {
    this.store.dispatch(TasksOrderByOptionsActions.clearOrderBy());
  }
}
