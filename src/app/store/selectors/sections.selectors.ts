import { createSelector } from '@ngrx/store';
import { Project, Section } from '../../models';
import {
  selectCurrentProjectId,
  selectProjects,
} from '../reducers/projects.reducer';
import {
  selectCurrentSectionId,
  selectSections,
} from '../reducers/sections.reducer';
import { selectTasks } from '../reducers/tasks.reducer';

export const selectCurrentSection = createSelector(
  selectCurrentSectionId,
  selectSections,
  (sectionId, sections) => sections.find((s) => s.id === sectionId)
);

export const selectSectionsWithIncompleteTasks = createSelector(
  selectCurrentProjectId,
  selectSections,
  selectTasks,
  (projectId, sections, tasks) =>
    sections.reduce((collection, section) => {
      const tasksForSection = tasks.filter(
        (task) =>
          task.sectionId === section.id &&
          task.projectId === projectId &&
          !task.isCompleted
      );
      if (tasksForSection.length > 0) {
        collection.push({
          ...section,
          tasks: tasksForSection,
        });
      }
      return collection;
    }, [] as Section[])
);

export const selectSectionsWithTasks = createSelector(
  selectCurrentProjectId,
  selectSections,
  selectTasks,
  (projectId, sections, tasks) =>
    sections.reduce((collection, section) => {
      const tasksForSection = tasks.filter(
        (task) => task.sectionId === section.id && task.projectId === projectId
      );
      if (tasksForSection.length > 0) {
        collection.push({
          ...section,
          tasks: tasksForSection,
        });
      }
      return collection;
    }, [] as Section[])
);

export const selectMoveToSectionsOptions = createSelector(
  selectCurrentSectionId,
  selectSections,
  (currentSectionId: number | null, sections: Section[]) =>
    currentSectionId === null
      ? []
      : sections.filter((section) => section.id !== currentSectionId)
);

export const selectSectionsGroupedByProject = createSelector(
  selectSections,
  selectProjects,
  (sections, projects) =>
    projects.reduce((map, project) => {
      map.set(
        project,
        sections.filter((section) => section.projectId === project.id)
      );
      return map;
    }, new Map<Project, Array<Section>>())
);
