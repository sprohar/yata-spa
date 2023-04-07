import { Task } from '../../models';
import { SortOrder } from './sort-order.enum';
import { SortStrategy } from './sort.strategy';

export class TasksPrioritySortStrategy implements SortStrategy<Task> {
  private readonly sortOrder: SortOrder;

  constructor(sortOrder?: SortOrder) {
    this.sortOrder = sortOrder ? sortOrder : SortOrder.DESC;
  }

  sort(data: Task[]): Task[] {
    const tasks = [...data];
    return tasks.sort((a, b) => {
      return this.sortOrder === SortOrder.ASC
        ? a.priority! - b.priority!
        : b.priority! - a.priority!;
    });
  }
}
