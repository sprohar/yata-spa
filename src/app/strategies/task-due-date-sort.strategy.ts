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

    return tasks.sort((a, b) => {
      if (a.dueDate === undefined) return 1;
      if (b.dueDate === undefined) return 1;

      const ad = new Date(a.dueDate!);
      const bd = new Date(b.dueDate!);

      return this.sortOrder === SortOrder.ASC
        ? ad.getTime() - bd.getTime()
        : bd.getTime() - ad.getTime();
    });
  }
}
