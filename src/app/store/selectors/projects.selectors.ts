import { createSelector } from '@ngrx/store';
import { Project, Section } from '../../models';
import {
  selectCurrentProjectId,
  selectProjects,
} from '../reducers/projects.reducer';
import { selectSections } from '../reducers/sections.reducer';
import { selectTasks } from '../reducers/tasks.reducer';

export const selectCurrentProject = createSelector(
  selectCurrentProjectId,
  selectProjects,
  (projectId: number | null, projects: Project[]) =>
    projects.find((p) => p.id === projectId)
);

export const selectKanbanColumns = createSelector(
  selectSections,
  selectTasks,
  (sections, tasks) => {
    const collection: Section[] = [];
    for (const section of sections) {
      collection.push({
        ...section,
        tasks: tasks.filter((task) => task.sectionId === section.id),
      });
    }
    return collection;
  }
);
