import { createFeature, createReducer, on } from '@ngrx/store';
import { Project } from '../../models';
import { YataApiActions } from '../actions';

export interface ProjectsState {
  projects: Project[];
  currentProjectId: number | null;
}

const initialState: ProjectsState = {
  projects: [],
  currentProjectId: null,
};

export const projectsFeature = createFeature({
  name: 'projects',
  reducer: createReducer(
    initialState,
    on(YataApiActions.createProjectSuccess, (state, action) => ({
      ...state,
      projects: state.projects.concat(action.project),
    })),
    on(YataApiActions.loadProjectsSuccess, (state, action) => ({
      ...state,
      projects: action.projects,
    }))
  ),
});

export const {
  name,
  reducer,
  selectCurrentProjectId,
  selectProjects,
  selectProjectsState,
} = projectsFeature;
