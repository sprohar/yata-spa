import { formatDate } from '@angular/common';
import { createSelector } from '@ngrx/store';
import { Priority, Project, Section, Task } from '../../models';
import { selectProjects } from '../reducers/projects.reducer';
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

export const selectGroupedTasks = createSelector(
  selectTasks,
  selectSections,
  selectOrderBy,
  (tasks, sections, orderBy) => {
    console.log('order by', orderBy);
    // Group by SECTION
    if (orderBy === null) {
      // group by sections
      const unsectioned: Section = {
        id: -1,
        name: 'Unsectioned',
        projectId: tasks.at(0)!.projectId,
      };

      return tasks.reduce((map, task) => {
        if (task.sectionId === undefined) {
          const value = map.get(unsectioned);
          value ? value.push(task) : map.set(unsectioned, [task]);
          return map;
        }

        const section = sections.find(
          (section) => section.id === task.sectionId
        );

        if (!section) return map;
        const tasks = map.get(section);
        tasks ? tasks.push(task) : map.set(section, [task]);

        return map;
      }, new Map<Section, Task[]>());
    }

    // Group by DUE_DATE
    if (orderBy === Task.OrderBy.DUE_DATE) {
      const noDueDateSection: Section = {
        id: 0,
        projectId: 0,
        name: 'No due date',
      };

      const dateSections: Section[] = [noDueDateSection];
      return tasks.reduce((map, task) => {
        if (!task.dueDate) {
          const value = map.get(noDueDateSection);
          value ? value.push(task) : map.set(noDueDateSection, [task]);
          return map;
        }

        const date = formatDate(
          task.dueDate.split('T').at(0)!,
          'fullDate',
          navigator.language
        );

        const section = dateSections.find((s) => s.name === date);
        if (!section) {
          const newDateSection = { id: 0, projectId: 0, name: date };
          map.set(newDateSection, [task]);
          dateSections.push(newDateSection);
          return map;
        }

        map.get(section)?.push(task);
        return map;
      }, new Map<Section, Task[]>());
    }

    // group by PRIORITY
    const prioritySections: Section[] = [
      { id: Priority.NONE, projectId: 0, name: 'No priority' },
      { id: Priority.LOW, projectId: 0, name: 'Low priority' },
      { id: Priority.MEDIUM, projectId: 0, name: 'Medium priority' },
      { id: Priority.HIGH, projectId: 0, name: 'High priority' },
    ];

    return tasks.reduce((map, task) => {
      if (task.priority === undefined) return map;

      const prioritySection = prioritySections.find(
        (s) => s.id === task.priority
      );

      if (!prioritySection) return map;

      const tasks = map.get(prioritySection);
      tasks ? tasks.push(task) : map.set(prioritySection, [task]);
      return map;
    }, new Map<Section, Task[]>());
  }
);
