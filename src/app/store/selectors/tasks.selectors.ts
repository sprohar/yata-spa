import { createSelector } from '@ngrx/store';
import { Grouped } from '../../interfaces';
import { Priority, Task } from '../../models';
import { selectCurrentTaskId, selectTasks } from '../reducers/tasks.reducer';

export const selectCurrentTask = createSelector(
  selectCurrentTaskId,
  selectTasks,
  (taskId, tasks) => tasks.find((t) => t.id === taskId)
);

export const selectUnsectionedTasks = createSelector(selectTasks, (tasks) =>
  tasks.filter((task) => !task.sectionId)
);

export const selectCompletedTasks = createSelector(selectTasks, (tasks) =>
  tasks.filter((task) => task.completed)
);

export const selectHighPriorityTasks = createSelector(selectTasks, (tasks) =>
  tasks.filter((t) => t.priority === Priority.HIGH)
);

export const selectMediumPriorityTasks = createSelector(selectTasks, (tasks) =>
  tasks.filter((t) => t.priority === Priority.MEDIUM)
);

export const selectLowPriorityTasks = createSelector(selectTasks, (tasks) =>
  tasks.filter((t) => t.priority === Priority.LOW)
);

export const selectNoPriorityTasks = createSelector(selectTasks, (tasks) =>
  tasks.filter((t) => t.priority === Priority.NONE)
);

export const selectTodaysTasks = createSelector(selectTasks, (tasks) =>
  tasks.filter((task) => {
    if (!task.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return (
      dueDate.getDate() === today.getDate() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear()
    );
  })
);

export const selectOverdueTasks = createSelector(selectTasks, (tasks) =>
  tasks.filter((task) => {
    if (!task.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  })
);

export const selectUpcomingTasks = createSelector(selectTasks, (tasks) =>
  tasks.filter((task) => {
    if (!task.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate > today;
  })
);

export const selectTasksGroupByDueDate = createSelector(selectTasks, (tasks) =>
  tasks.reduce((acc: Grouped<Task>, task: Task) => {
    if (!task.dueDate) return acc;
    const date = task.dueDate.split('T')[0];

    if (!acc[date as keyof Grouped<Task>]) {
      acc[date] = [];
    }

    acc[date].push(task);
    return acc;
  }, {})
);

export const selectTasksGroupByPriority = createSelector(
  selectTasks,
  (tasks: Task[]) => {
    const map = new Map<Priority, Task[]>();
    for (const task of tasks) {
      if (task.priority === undefined) continue;
      if (map.has(task.priority)) {
        map.get(task.priority)?.push(task);
      } else {
        map.set(task.priority, [task]);
      }
    }

    return map;
  }
);

export const selectTasksGroupByProjectId = createSelector(
  selectTasks,
  (tasks) =>
  // TODO: Replace this with a map
    tasks.reduce((acc: Grouped<Task>, task: Task) => {
      if (task.projectId === undefined) return acc;
      if (!acc[task.projectId as keyof Grouped<Task>]) {
        acc[task.projectId] = [];
      }

      acc[task.projectId].push(task);
      return acc;
    }, {})
);
