import { GroupedTasks } from '../../interfaces';
import { Task } from '../../models';
import {
  TasksState,
  initialTasksState,
  selectTasks,
  selectTasksState,
} from '../reducers/tasks.reducer';
import {
  selectCompletedTasks,
  selectCurrentTask,
  selectHighPriorityTasks,
  selectLowPriorityTasks,
  selectMediumPriorityTasks,
  selectNoPriorityTasks,
  selectOverdueTasks,
  selectTasksGroupByDueDate,
  selectTodaysTasks,
  selectUnsectionedTasks,
  selectUpcomingTasks,
} from './tasks.selectors';

describe('Tasks Selectors', () => {
  const initialState: TasksState = {
    currentTaskId: 1,
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        content: 'Task 1 content',
        completed: false,
        priority: Task.Priority.HIGH,
        dueDate: '2020-01-01T00:00:00.000Z',
        projectId: 1,
      },
      {
        id: 12,
        title: 'Task 2',
        content: 'Task 2 content',
        completed: false,
        priority: Task.Priority.MEDIUM,
        dueDate: '2020-01-01T00:00:00.000Z',
        sectionId: 1,
        projectId: 1,
      },
      {
        id: 3,
        title: 'Task 3',
        content: 'Task 3 content',
        completed: false,
        priority: Task.Priority.LOW,
        dueDate: '2020-01-02T00:00:00.000Z',
        sectionId: 1,
        projectId: 1,
      },
      {
        id: 4,
        title: 'Task 4',
        content: 'Task 4 content',
        completed: true,
        priority: Task.Priority.NONE,
        dueDate: '2020-01-03T00:00:00.000Z',
        sectionId: 1,
        projectId: 1,
      },
    ],
  };

  it('should select the feature state', () => {
    const result = selectTasksState.projector(initialTasksState);
    expect(result).toEqual(initialTasksState);
  });

  it('should select the tasks', () => {
    const result = selectTasks.projector(initialTasksState);
    expect(result).toEqual(initialTasksState.tasks);
  });

  it('should select the current task', () => {
    const result = selectCurrentTask.projector(
      initialState.currentTaskId,
      initialState.tasks
    );
    const currentTask = initialState.tasks.find(
      (t) => t.id === initialState.currentTaskId
    );
    expect(result).toEqual(currentTask);
  });

  it('should select the unsectioned tasks', () => {
    const result = selectUnsectionedTasks.projector(initialState.tasks);
    const unsectionedTasks = initialState.tasks.filter(
      (task) => !task.sectionId
    );
    expect(result).toEqual(unsectionedTasks);
  });

  it('should select the completed tasks', () => {
    const result = selectCompletedTasks.projector(initialState.tasks);
    const completedTasks = initialState.tasks.filter((task) => task.completed);
    expect(result).toEqual(completedTasks);
  });

  it('should select the high priority tasks', () => {
    const result = selectHighPriorityTasks.projector(initialState.tasks);
    const highPriorityTasks = initialState.tasks.filter(
      (t) => t.priority === Task.Priority.HIGH
    );
    expect(result).toEqual(highPriorityTasks);
  });

  it('should select the medium priority tasks', () => {
    const result = selectMediumPriorityTasks.projector(initialState.tasks);
    const mediumPriorityTasks = initialState.tasks.filter(
      (t) => t.priority === Task.Priority.MEDIUM
    );
    expect(result).toEqual(mediumPriorityTasks);
  });

  it('should select the low priority tasks', () => {
    const result = selectLowPriorityTasks.projector(initialState.tasks);
    const lowPriorityTasks = initialState.tasks.filter(
      (t) => t.priority === Task.Priority.LOW
    );
    expect(result).toEqual(lowPriorityTasks);
  });

  it('should select the no priority tasks', () => {
    const result = selectNoPriorityTasks.projector(initialState.tasks);
    const noPriorityTasks = initialState.tasks.filter(
      (t) => t.priority === Task.Priority.NONE
    );
    expect(result).toEqual(noPriorityTasks);
  });

  it('should select the tasks due today', () => {
    const today = new Date();
    const tasksDueToday = initialState.tasks.filter((t) => {
      if (!t.dueDate) return false;
      const dueDate = new Date(t.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === today.getTime();
    });

    const result = selectTodaysTasks.projector(initialState.tasks);
    expect(result).toEqual(tasksDueToday);
  });

  it('should select overdue tasks', () => {
    const today = new Date();
    const tasksOverdue = initialState.tasks.filter((t) => {
      if (!t.dueDate) return false;
      const dueDate = new Date(t.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() < today.getTime();
    });

    const result = selectOverdueTasks.projector(initialState.tasks);
    expect(result).toEqual(tasksOverdue);
  });

  it('should select upcoming tasks', () => {
    const today = new Date();
    const tasksUpcoming = initialState.tasks.filter((t) => {
      if (!t.dueDate) return false;
      const dueDate = new Date(t.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() > today.getTime();
    });

    const result = selectUpcomingTasks.projector(initialState.tasks);
    expect(result).toEqual(tasksUpcoming);
  });

  it('should group tasks by due date', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const tasks = [
      {
        id: 1,
        title: 'Task 1',
        content: 'Task 1 content',
        completed: false,
        priority: Task.Priority.HIGH,
        dueDate: today.toISOString(),
        projectId: 1,
      },
      {
        id: 2,
        title: 'Task 2',
        content: 'Task 2 content',
        completed: false,
        priority: Task.Priority.MEDIUM,
        dueDate: today.toISOString(),
        projectId: 1,
      },
      {
        id: 3,
        title: 'Task 3',
        content: 'Task 3 content',
        completed: false,
        priority: Task.Priority.LOW,
        dueDate: tomorrow.toISOString(),
        projectId: 1,
      },
      {
        id: 4,
        title: 'Task 4',
        content: 'Task 4 content',
        completed: true,
        priority: Task.Priority.NONE,
        dueDate: tomorrow.toISOString(),
        projectId: 1,
      },
    ];

    const todayDate = today.toISOString().split('T')[0];
    const tomorrowDate = tomorrow.toISOString().split('T')[0];

    const tasksGroupedByDueDate: GroupedTasks = {
      [todayDate]: [tasks[0], tasks[1]],
      [tomorrowDate]: [tasks[2], tasks[3]],
    };

    const result = selectTasksGroupByDueDate.projector(tasks);
    expect(result).toEqual(tasksGroupedByDueDate);
  });
});
