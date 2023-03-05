import { createSelector } from '@ngrx/store';
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
