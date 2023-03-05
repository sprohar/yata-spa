import { createSelector } from '@ngrx/store';
import { Project } from '../../models';
import {
  selectCurrentProjectId,
  selectProjects,
} from '../reducers/projects.reducer';

export const selectCurrentProject = createSelector(
  selectCurrentProjectId,
  selectProjects,
  (currentProjectId: number | null, projects: Project[]) =>
    projects.find((project) => project.id === currentProjectId)
);

/**
 * Selects all projects from the store *except* the current project
 */
export const selectProjectsDropdown = createSelector(
  selectCurrentProjectId,
  selectProjects,
  (currentProjectId, projects) =>
    projects.filter((project) => project.id !== currentProjectId)
);
