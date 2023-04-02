import { createSelector } from '@ngrx/store';
import { GroupedTasks } from '../../interfaces';
import { Task } from '../../models';
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
  tasks.filter((t) => t.priority === Task.Priority.HIGH)
);

export const selectMediumPriorityTasks = createSelector(selectTasks, (tasks) =>
  tasks.filter((t) => t.priority === Task.Priority.MEDIUM)
);

export const selectLowPriorityTasks = createSelector(selectTasks, (tasks) =>
  tasks.filter((t) => t.priority === Task.Priority.LOW)
);

export const selectNoPriorityTasks = createSelector(selectTasks, (tasks) =>
  tasks.filter((t) => t.priority === Task.Priority.NONE)
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
  tasks.reduce((acc, task) => {
    const date = task.dueDate?.split('T')[0];
    if (!date) return acc;

    if (!acc[date as keyof Object]) {
      // @ts-ignore
      acc[date] = [];
    }
    // @ts-ignore
    acc[date].push(task);
    return acc;
  }, {} as GroupedTasks)
);
