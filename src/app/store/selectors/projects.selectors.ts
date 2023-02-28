import { createSelector } from '@ngrx/store';
import { Project } from '../../models';
import {
  selectCurrentProjectId,
  selectProjects,
} from '../reducers/projects.reducer';

export const selectCurrentProject = createSelector(
  selectCurrentProjectId,
  selectProjects,
  (projectId: number | null, projects: Project[]) =>
    projects.find((p) => p.id === projectId)
);
