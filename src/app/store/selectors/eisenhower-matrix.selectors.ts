import { createSelector } from '@ngrx/store';
import { Priority, Project, Task } from '../../models';
import { selectProjects } from '../reducers/projects.reducer';
import { selectTasks } from '../reducers/tasks.reducer';

export const selectCompletedHighPriorityTasks = createSelector(
  selectTasks,
  (tasks) =>
    tasks.filter((task) => task.isCompleted && task.priority === Priority.HIGH)
);

export const selectCompletedMediumPriorityTasks = createSelector(
  selectTasks,
  (tasks) =>
    tasks.filter(
      (task) => task.isCompleted && task.priority === Priority.MEDIUM
    )
);

export const selectCompletedLowPriorityTasks = createSelector(
  selectTasks,
  (tasks) =>
    tasks.filter((task) => task.isCompleted && task.priority === Priority.LOW)
);

export const selectCompletedNoPriorityTasks = createSelector(
  selectTasks,
  (tasks) =>
    tasks.filter((task) => task.isCompleted && task.priority === Priority.NONE)
);

export const selectHighPriorityTasksGroupByProject = createSelector(
  selectProjects,
  selectTasks,
  (projects, tasks) =>
    tasks.reduce((map, task) => {
      if (task.isCompleted) return map;
      if (task.priority === undefined) return map;
      if (task.priority !== Priority.HIGH) return map;
      if (task.projectId === undefined) return map;
      const project = projects.find((project) => project.id === task.projectId);

      if (project === undefined) return map;

      const tasks = map.get(project);
      tasks === undefined ? map.set(project, [task]) : tasks.push(task);

      return map;
    }, new Map<Project, Task[]>())
);

export const selectMediumPriorityTasksGroupByProject = createSelector(
  selectProjects,
  selectTasks,
  (projects, tasks) =>
    tasks.reduce((map, task) => {
      if (task.isCompleted) return map;
      if (task.priority === undefined) return map;
      if (task.priority !== Priority.MEDIUM) return map;
      if (task.projectId === undefined) return map;
      const project = projects.find((project) => project.id === task.projectId);

      if (project === undefined) return map;

      const tasks = map.get(project);
      tasks === undefined ? map.set(project, [task]) : tasks.push(task);

      return map;
    }, new Map<Project, Task[]>())
);

export const selectLowPriorityTasksGroupByProject = createSelector(
  selectProjects,
  selectTasks,
  (projects, tasks) =>
    tasks.reduce((map, task) => {
      if (task.isCompleted) return map;
      if (task.priority === undefined) return map;
      if (task.priority !== Priority.LOW) return map;
      if (task.projectId === undefined) return map;
      const project = projects.find((project) => project.id === task.projectId);

      if (project === undefined) return map;

      const tasks = map.get(project);
      tasks === undefined ? map.set(project, [task]) : tasks.push(task);

      return map;
    }, new Map<Project, Task[]>())
);

export const selectNoPriorityTasksGroupByProject = createSelector(
  selectProjects,
  selectTasks,
  (projects, tasks) =>
    tasks.reduce((map, task) => {
      if (task.isCompleted) return map;
      if (task.priority === undefined) return map;
      if (task.priority !== Priority.NONE) return map;
      if (task.projectId === undefined) return map;
      const project = projects.find((project) => project.id === task.projectId);

      if (project === undefined) return map;

      const tasks = map.get(project);
      tasks === undefined ? map.set(project, [task]) : tasks.push(task);

      return map;
    }, new Map<Project, Task[]>())
);
