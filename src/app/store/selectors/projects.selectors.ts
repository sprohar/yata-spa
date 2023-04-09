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
