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

export const selectProjectsForSidenav = createSelector(
  selectProjects,
  (projects: Project[]) =>
    projects.filter((project) => project.name.toLowerCase() !== 'inbox')
);

export const selectInbox = createSelector(
  selectProjects,
  (projects: Project[]) =>
    projects.find((project) => project.name.toLowerCase() === 'inbox')
);
