import { createFeature, createReducer, on } from '@ngrx/store';
import { Project } from '../../models';
import {
  EisenhowerMatrixActions,
  SidenavActions,
  YataApiActions,
} from '../actions';

export interface ProjectsState {
  projects: Project[];
  currentProjectId: number | null;
}

export const projectsInitialState: ProjectsState = {
  projects: [],
  currentProjectId: null,
};

export const projectsFeature = createFeature({
  name: 'projects',
  reducer: createReducer(
    projectsInitialState,
    on(EisenhowerMatrixActions.onInit, (state, _) => ({
      ...state,
      currentProjectId: null,
    })),
    on(SidenavActions.selectTag, (state, _action) => ({
      projects: state.projects,
      currentProjectId: null,
    })),
    on(SidenavActions.projectSelected, (state, action) => ({
      projects: state.projects,
      currentProjectId: action.projectId,
    })),
    on(YataApiActions.createProjectSuccess, (state, action) => ({
      ...state,
      projects: state.projects
        .concat(action.project)
        .sort((a, b) => a.name.localeCompare(b.name)),
    })),
    on(YataApiActions.deleteProjectSuccess, (state, action) => ({
      currentProjectId: null,
      projects: state.projects.filter((p) => p.id !== action.project.id),
    })),
    on(YataApiActions.loadProjectsSuccess, (state, action) => ({
      ...state,
      projects: action.projects,
    })),
    on(YataApiActions.updateProjectSuccess, (state, action) => ({
      currentProjectId: state.currentProjectId,
      projects: state.projects.map((project) =>
        project.id === action.project.id ? action.project : project
      ),
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
