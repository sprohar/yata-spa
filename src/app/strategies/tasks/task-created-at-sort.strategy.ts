import { SortOrder } from '../../enums/sort-order.enum';
import { SortStrategy } from '../../interfaces/sort-strategy.interface';
import { Task } from '../../models';

export class TaskCreatedAtSortStrategy implements SortStrategy<Task> {
  private readonly sortOrder: SortOrder;

  constructor(sortOrder?: SortOrder) {
    this.sortOrder = sortOrder ? sortOrder : SortOrder.ASC;
  }

  sort(data: Task[]): Task[] {
    const tasks = [...data];

    tasks.sort((a, b) => {
      const ad = new Date(a.createdAt ?? new Date());
      const bd = new Date(b.createdAt ?? new Date());
      return this.sortOrder === SortOrder.ASC
        ? ad.getTime() - bd.getTime()
        : bd.getTime() - ad.getTime();
    });

    return tasks;
  }
}
