import { SortStrategy } from '../interfaces';
import { Task } from '../models';

export class TaskListSortContext {
  private strategy: SortStrategy<Task>;

  constructor(strategy: SortStrategy<Task>) {
    this.strategy = strategy;
  }

  sort(tasks: Task[]) {
    return this.strategy.sort(tasks);
  }
}
