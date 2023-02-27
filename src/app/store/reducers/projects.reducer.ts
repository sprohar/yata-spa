import { createFeature, createReducer } from '@ngrx/store';
import { Project } from '../../models';

interface State {
  projects: Project[];
  currentProjectId: number | null;
}

const initialState: State = {
  projects: [],
  currentProjectId: null,
};

export const projectsFeature = createFeature({
  name: 'projects',
  reducer: createReducer(initialState),
});

export const {
  name,
  reducer,
  selectCurrentProjectId,
  selectProjects,
  selectProjectsState,
} = projectsFeature;
