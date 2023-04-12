import { Priority, Project, Tag, Task } from '../../models';
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
  selectTasksGroupByPriority,
  selectTasksGroupByProject,
  selectTasksGroupedByTag,
  selectTodaysTasks,
  selectUnsectionedTasks,
  selectUpcomingTasks,
} from './tasks.selectors';

describe('Tasks Selectors', () => {
  const initialState: TasksState = {
    currentTaskId: 1,
    orderBy: null,
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        content: 'Task 1 content',
        isCompleted: false,
        priority: Priority.HIGH,
        dueDate: '2020-01-01T00:00:00.000Z',
        projectId: 1,
      },
      {
        id: 12,
        title: 'Task 2',
        content: 'Task 2 content',
        isCompleted: false,
        priority: Priority.MEDIUM,
        dueDate: '2020-01-01T00:00:00.000Z',
        sectionId: 1,
        projectId: 1,
      },
      {
        id: 3,
        title: 'Task 3',
        content: 'Task 3 content',
        isCompleted: false,
        priority: Priority.LOW,
        dueDate: '2020-01-02T00:00:00.000Z',
        sectionId: 1,
        projectId: 1,
      },
      {
        id: 4,
        title: 'Task 4',
        content: 'Task 4 content',
        isCompleted: true,
        priority: Priority.NONE,
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
    const completedTasks = initialState.tasks.filter(
      (task) => task.isCompleted
    );
    expect(result).toEqual(completedTasks);
  });

  it('should select the high priority tasks', () => {
    const result = selectHighPriorityTasks.projector(initialState.tasks);
    const highPriorityTasks = initialState.tasks.filter(
      (t) => t.priority === Priority.HIGH
    );
    expect(result).toEqual(highPriorityTasks);
  });

  it('should select the medium priority tasks', () => {
    const result = selectMediumPriorityTasks.projector(initialState.tasks);
    const mediumPriorityTasks = initialState.tasks.filter(
      (t) => t.priority === Priority.MEDIUM
    );
    expect(result).toEqual(mediumPriorityTasks);
  });

  it('should select the low priority tasks', () => {
    const result = selectLowPriorityTasks.projector(initialState.tasks);
    const lowPriorityTasks = initialState.tasks.filter(
      (t) => t.priority === Priority.LOW
    );
    expect(result).toEqual(lowPriorityTasks);
  });

  it('should select the no priority tasks', () => {
    const result = selectNoPriorityTasks.projector(initialState.tasks);
    const noPriorityTasks = initialState.tasks.filter(
      (t) => t.priority === Priority.NONE
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
    // TODO: Fix this spec
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const tasks = [
      {
        id: 1,
        title: 'Task 1',
        completed: false,
        priority: Priority.HIGH,
        dueDate: today.toISOString(),
        projectId: 1,
      },
      {
        id: 2,
        title: 'Task 2',
        completed: false,
        priority: Priority.MEDIUM,
        dueDate: today.toISOString(),
        projectId: 1,
      },
      {
        id: 3,
        title: 'Task 3',
        completed: false,
        priority: Priority.LOW,
        dueDate: tomorrow.toISOString(),
        projectId: 1,
      },
      {
        id: 4,
        title: 'Task 4',
        completed: true,
        priority: Priority.NONE,
        dueDate: tomorrow.toISOString(),
        projectId: 1,
      },
    ];

    const todayDate = today.toISOString().split('T')[0];
    const tomorrowDate = tomorrow.toISOString().split('T')[0];

    const tasksGroupedByDueDate = new Map<string, Task[]>();
    tasksGroupedByDueDate.set(todayDate, [tasks[0], tasks[1]]);
    tasksGroupedByDueDate.set(tomorrowDate, [tasks[2], tasks[3]]);

    const result = selectTasksGroupByDueDate.projector(tasks);
    expect(result).toEqual(tasksGroupedByDueDate);
  });

  it('should group tasks by priority', () => {
    const tasks = [
      {
        id: 1,
        title: 'Task 1',
        content: 'Task 1 content',
        completed: false,
        priority: Priority.HIGH,
        dueDate: null,
        projectId: 1,
      },
      {
        id: 2,
        title: 'Task 2',
        content: 'Task 2 content',
        completed: false,
        priority: Priority.MEDIUM,
        dueDate: null,
        projectId: 1,
      },
      {
        id: 3,
        title: 'Task 3',
        content: 'Task 3 content',
        completed: false,
        priority: Priority.LOW,
        dueDate: null,
        projectId: 1,
      },
      {
        id: 4,
        title: 'Task 4',
        content: 'Task 4 content',
        completed: true,
        priority: Priority.NONE,
        dueDate: null,
        projectId: 1,
      },
    ];

    const tasksGroupedByPriority = new Map<Priority, Task[]>();
    tasksGroupedByPriority.set(Priority.HIGH, [tasks[0]]);
    tasksGroupedByPriority.set(Priority.MEDIUM, [tasks[1]]);
    tasksGroupedByPriority.set(Priority.LOW, [tasks[2]]);
    tasksGroupedByPriority.set(Priority.NONE, [tasks[3]]);

    const result = selectTasksGroupByPriority.projector(tasks);
    expect(result).toEqual(tasksGroupedByPriority);
  });

  it('should group tasks by project id', () => {
    const projects: Project[] = [
      { id: 1, name: 'Project 1' },
      { id: 2, name: 'Project 2' },
    ];

    const tasks = [
      {
        id: 1,
        title: 'Task 1',
        content: 'Task 1 content',
        completed: false,
        priority: Priority.HIGH,
        dueDate: null,
        projectId: 1,
      },
      {
        id: 2,
        title: 'Task 2',
        content: 'Task 2 content',
        completed: false,
        priority: Priority.MEDIUM,
        dueDate: null,
        projectId: 1,
      },
      {
        id: 3,
        title: 'Task 3',
        content: 'Task 3 content',
        completed: false,
        priority: Priority.LOW,
        dueDate: null,
        projectId: 2,
      },
      {
        id: 4,
        title: 'Task 4',
        content: 'Task 4 content',
        completed: true,
        priority: Priority.NONE,
        dueDate: null,
        projectId: 2,
      },
    ];

    const tasksGroupedByProject = new Map<Project, Task[]>();
    tasksGroupedByProject.set(projects[0], [tasks[0], tasks[1]]);
    tasksGroupedByProject.set(projects[1], [tasks[2], tasks[3]]);

    const result = selectTasksGroupByProject.projector(projects, tasks);
    expect(result).toEqual(tasksGroupedByProject);
  });

  describe('selectTasksGroupedByTag', () => {
    it('should group tasks by tag', () => {
      const tags: Tag[] = [
        { id: 1, name: 'Tag 1' },
        { id: 2, name: 'Tag 2' },
      ];

      const tasks: Task[] = [
        {
          id: 1,
          title: 'Task 1',
          content: 'Task 1 content',
          isCompleted: false,
          priority: Priority.HIGH,
          projectId: 1,
          tags: [tags[0]],
        },
        {
          id: 2,
          title: 'Task 2',
          content: 'Task 2 content',
          isCompleted: false,
          priority: Priority.MEDIUM,
          projectId: 1,
          tags: [tags[0]],
        },
        {
          id: 3,
          title: 'Task 3',
          content: 'Task 3 content',
          isCompleted: false,
          priority: Priority.LOW,
          projectId: 2,
          tags: [tags[1]],
        },
        {
          id: 4,
          title: 'Task 4',
          content: 'Task 4 content',
          isCompleted: true,
          priority: Priority.NONE,
          projectId: 2,
          tags: [tags[1]],
        },
      ];

      const tasksGroupedByTag = new Map<Tag, Task[]>();
      tasksGroupedByTag.set(tags[0], [tasks[0], tasks[1]]);
      tasksGroupedByTag.set(tags[1], [tasks[2], tasks[3]]);

      const result = selectTasksGroupedByTag.projector(tasks, tags);
      expect(result).toEqual(tasksGroupedByTag);
    });
  });
});
