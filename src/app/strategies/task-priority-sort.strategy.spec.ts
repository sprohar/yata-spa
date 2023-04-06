import { SortOrder } from '../enums/sort-order.enum';
import { Priority, Task } from '../models';
import { TaskListSortContext } from './task-list-sort-context';
import { TaskPrioritySortStrategy } from './task-priority-sort.strategy';

describe('TaskPrioritySortStrategy', () => {
  describe('#sort', () => {
    it('should sort the tasks by priority in ascending order', () => {
      const tasks: Task[] = [
      { id: 1, title: 'Task 1', projectId: 1, priority: Priority.LOW },
      { id: 2, title: 'Task 2', projectId: 1, priority: Priority.HIGH },
      { id: 3, title: 'Task 3', projectId: 1, priority: Priority.NONE },
      { id: 4, title: 'Task 4', projectId: 1, priority: Priority.MEDIUM },
    ];

      const strategy = new TaskPrioritySortStrategy(SortOrder.ASC)
      const sortedTasks = strategy.sort(tasks);

      expect(sortedTasks[0].id).toBe(3); // none
      expect(sortedTasks[1].id).toBe(1); // low
      expect(sortedTasks[2].id).toBe(4); // medium
      expect(sortedTasks[3].id).toBe(2); // high
    });

    it('should sort the tasks by priority in descending order', () => {
      const tasks: Task[] = [
        { id: 1, title: 'Task 1', projectId: 1, priority: Priority.LOW },
        { id: 2, title: 'Task 2', projectId: 1, priority: Priority.HIGH },
        { id: 3, title: 'Task 3', projectId: 1, priority: Priority.NONE },
        { id: 4, title: 'Task 4', projectId: 1, priority: Priority.MEDIUM },
      ];

      const strategy = new TaskPrioritySortStrategy(SortOrder.DESC)
      const sortedTasks = strategy.sort(tasks);

      expect(sortedTasks[0].id).toBe(2); // high
      expect(sortedTasks[1].id).toBe(4); // medium
      expect(sortedTasks[2].id).toBe(1); // low
      expect(sortedTasks[3].id).toBe(3); // none
    });
  });
});
