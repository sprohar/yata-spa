import { Task } from '../../models';
import { SortStrategy } from './sort.strategy';

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
}
