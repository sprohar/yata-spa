import { createSelector } from '@ngrx/store';
import { Priority, Project, Task } from '../../models';
import {
  groupTasksByDueDate,
  groupTasksByPriority,
  groupProjectTasksBySection,
} from '../../strategies/group-by';
import {
  selectCurrentProjectId,
  selectProjects,
} from '../reducers/projects.reducer';
import { selectSections } from '../reducers/sections.reducer';
import {
  selectCurrentTaskId,
  selectOrderBy,
  selectTasks,
} from '../reducers/tasks.reducer';

export const selectCurrentTask = createSelector(
  selectCurrentTaskId,
  selectTasks,
  (taskId, tasks) => tasks.find((t) => t.id === taskId)
);

export const selectUnsectionedTasks = createSelector(selectTasks, (tasks) =>
  tasks.filter((task) => !task.sectionId)
);

export const selectCompletedTasks = createSelector(selectTasks, (tasks) =>
  tasks.filter((task) => task.isCompleted)
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
  tasks.reduce((map, task) => {
    if (!task.dueDate) return map;
    const key = task.dueDate.split('T')[0];
    const entry = map.get(key);
    entry === undefined ? map.set(key, [task]) : entry.push(task);
    return map;
  }, new Map<string, Task[]>())
);

export const selectTasksGroupByPriority = createSelector(
  selectTasks,
  (tasks: Task[]) =>
    tasks.reduce((map, task) => {
      if (task.priority === undefined) return map;
      const entry = map.get(task.priority);
      entry === undefined ? map.set(task.priority, [task]) : entry.push(task);
      return map;
    }, new Map<Priority, Task[]>())
);

export const selectTasksGroupByProject = createSelector(
  selectProjects,
  selectTasks,
  (projects, tasks) =>
    tasks.reduce((map, task) => {
      if (task.projectId === undefined) return map;
      const key = projects.find((project) => project.id === task.projectId);
      if (key === undefined) return map;
      const entry = map.get(key);
      entry === undefined ? map.set(key, [task]) : entry.push(task);
      return map;
    }, new Map<Project, Task[]>())
);

export const selectProjectTasksGroupedBySection = createSelector(
  selectTasks,
  selectSections,
  selectOrderBy,
  selectCurrentProjectId,
  (tasks, sections, orderBy, currentProjectId) => {
    // Group by SECTION is the default
    if (orderBy === null || orderBy.attribute === Task.OrderBy.SECTION) {
      return groupProjectTasksBySection(sections, tasks, currentProjectId!);
    }

    // Group by DUE_DATE
    if (orderBy.attribute === Task.OrderBy.DUE_DATE) {
      return groupTasksByDueDate(tasks);
    }

    // group by PRIORITY
    return groupTasksByPriority(tasks);
  }
);
