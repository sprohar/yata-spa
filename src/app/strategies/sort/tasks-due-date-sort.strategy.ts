import { Task } from '../../models';
import { SortOrder } from './sort-order.enum';
import { SortStrategy } from './sort.strategy';

export class TasksDueDateSortStrategy implements SortStrategy<Task> {
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
