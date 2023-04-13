import { Task } from '../../models';
import { TasksOrderByState } from '../../store/reducers/tasks.reducer';
import { SortStrategy } from './sort.strategy';
import { TasksDueDateSortStrategy } from './tasks-due-date-sort.strategy';
import { TasksPrioritySortStrategy } from './tasks-priority-sort.strategy';

export class TasksSortContext {
  private strategy: SortStrategy<Task>;

  constructor(strategy: SortStrategy<Task>) {
    this.strategy = strategy;
  }

  sort(tasks: Task[]) {
    return this.strategy.sort(tasks);
  }

  setStrategy(strategy: SortStrategy<Task>) {
    this.strategy = strategy;
    return this;
  }

  fromOrderBy(orderBy: TasksOrderByState | null) {
    if (orderBy === null) return this;

    switch (orderBy.attribute) {
      case Task.OrderBy.DUE_DATE:
        return this.setStrategy(new TasksDueDateSortStrategy(orderBy.dir));
      case Task.OrderBy.PRIORITY:
        return this.setStrategy(new TasksPrioritySortStrategy(orderBy.dir));
      default:
        return this;
    }
  }
}
