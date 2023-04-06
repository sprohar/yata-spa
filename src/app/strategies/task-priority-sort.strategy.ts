import { SortOrder } from '../enums/sort-order.enum';
import { SortStrategy } from '../interfaces/sort-strategy.interface';
import { Task } from '../models';

export class TaskPrioritySortStrategy implements SortStrategy<Task> {
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
