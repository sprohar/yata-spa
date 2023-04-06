import { SortOrder } from '../enums/sort-order.enum';
import { SortStrategy } from '../interfaces/sort-strategy.interface';
import { Task } from '../models';

export class TaskDueDateSortStrategy implements SortStrategy<Task> {
  private readonly sortOrder: SortOrder;

  constructor(sortOrder?: SortOrder) {
    this.sortOrder = sortOrder ? sortOrder : SortOrder.ASC;
  }

  sort(data: Task[]): Task[] {
    const tasks = [...data];

    return tasks.sort((task1, task2) => {
      // due date is null, so put it at the end
      if (!task1.dueDate) return 1;
      if (!task2.dueDate) return -1;

      const date1 = new Date(task1.dueDate);
      const date2 = new Date(task2.dueDate);

      return this.sortOrder === SortOrder.ASC
        ? date1.getTime() - date2.getTime()
        : date2.getTime() - date1.getTime();
    });
  }
}
