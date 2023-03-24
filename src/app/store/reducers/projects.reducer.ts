import { createFeature, createReducer, on } from '@ngrx/store';
import { Project } from '../../models';
import { SidenavActions, YataApiActions } from '../actions';

export interface ProjectsState {
  projects: Project[];
  currentProjectId: number | null;
}

export const projectsInitialState: ProjectsState = {
  projects: [],
  currentProjectId: null,
};

function updateProject(
  projects: Project[],
  updatedProject: Project
): Project[] {
  const collection: Project[] = [];
  for (const project of projects) {
    if (project.id === updatedProject.id) {
      collection.push(updatedProject);
    } else {
      collection.push(project);
    }
  }
  return collection;
}

export const projectsFeature = createFeature({
  name: 'projects',
  reducer: createReducer(
    projectsInitialState,
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
      projects: state.projects.concat(action.project),
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
      projects: updateProject(state.projects, action.project),
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
