import { SortOrder } from '../enums/sort-order.enum';
import { Task } from '../models';
import { TaskDueDateSortStrategy } from './task-due-date-sort.strategy';

describe('TaskDueDateSortStrategy', () => {
  describe('#sort', () => {
    it('should sort tasks by due date in ascending order', () => {
      const tasks: Task[] = [
        { id: 1, title: 'Task 3', projectId: 1 },
        { id: 2, title: 'Task 1', dueDate: '2020-01-01', projectId: 1 },
        { id: 3, title: 'Task 2', dueDate: '2020-01-02', projectId: 1 },
        { id: 4, title: 'Task 3', dueDate: '2020-01-03', projectId: 1 },
      ];

      const strategy = new TaskDueDateSortStrategy();
      const sortedTasks = strategy.sort(tasks);

      expect(sortedTasks[0].id).toBe(2);
      expect(sortedTasks[1].id).toBe(3);
      expect(sortedTasks[2].id).toBe(4);
      expect(sortedTasks[3].id).toBe(1);
    });

    it('should sort tasks by due date in descending order', () => {
      const tasks: Task[] = [
        { id: 1, title: 'Task 3', projectId: 1 },
        { id: 2, title: 'Task 1', dueDate: '2020-01-01', projectId: 1 },
        { id: 3, title: 'Task 2', dueDate: '2020-01-02', projectId: 1 },
        { id: 4, title: 'Task 3', dueDate: '2020-01-03', projectId: 1 },
      ];

      const strategy = new TaskDueDateSortStrategy(SortOrder.DESC);
      const sortedTasks = strategy.sort(tasks);

      expect(sortedTasks[0].id).toBe(4);
      expect(sortedTasks[1].id).toBe(3);
      expect(sortedTasks[2].id).toBe(2);
      expect(sortedTasks[3].id).toBe(1);
    });
  });
});
