import { Project } from '../../models';
import {
  EisenhowerMatrixActions,
  SidenavActions,
  YataApiActions,
} from '../actions';
import * as fromProjects from './projects.reducer';

describe('Projects reducer', () => {
  describe('EisenhowerMatrixActions.onInit', () => {
    it('should set the currentProjectId to null', () => {
      const { initialProjectsState: projectsInitialState } = fromProjects;
      const action = EisenhowerMatrixActions.onInit();
      const state = fromProjects.reducer(projectsInitialState, action);
      expect(state).toEqual({
        ...projectsInitialState,
        currentProjectId: null,
      });
    });
  });

  describe('SidenavActions.selectTag', () => {
    it('should set the currentProjectId to null', () => {
      const { initialProjectsState: projectsInitialState } = fromProjects;
      const action = SidenavActions.selectTag({
        tagId: 1,
      });

      const state = fromProjects.reducer(projectsInitialState, action);
      expect(state).toEqual({
        ...projectsInitialState,
        currentProjectId: null,
      });
    });
  });

  describe('SidenavActions.projectSelected', () => {
    it('should set the currentProjectId to null', () => {
      const { initialProjectsState: projectsInitialState } = fromProjects;
      const action = SidenavActions.projectSelected({
        projectId: 1,
      });

      const state = fromProjects.reducer(projectsInitialState, action);
      expect(state).toEqual({
        ...projectsInitialState,
        currentProjectId: action.projectId,
      });
    });
  });

  describe('YataApiActions.createProjectSuccess', () => {
    it('should set the currentProjectId to null', () => {
      const { initialProjectsState: projectsInitialState } = fromProjects;
      const action = YataApiActions.createProjectSuccess({
        project: {
          id: 1,
          name: 'Project 1',
        },
      });

      const state = fromProjects.reducer(projectsInitialState, action);
      expect(state).toEqual({
        ...projectsInitialState,
        projects: projectsInitialState.projects
          .concat(action.project)
          .sort((a, b) => a.name.localeCompare(b.name)),
      });
    });
  });

  describe('YataApiActions.deleteProjectSuccess', () => {
    it('should set the currentProjectId to null', () => {
      const { initialProjectsState: projectsInitialState } = fromProjects;
      const initialProjectsCollection = [...projectsInitialState.projects];
      const project: Project = { id: 1, name: 'Project 1' };
      projectsInitialState.projects.push(project);

      const action = YataApiActions.deleteProjectSuccess({ project });
      const state = fromProjects.reducer(projectsInitialState, action);

      expect(state).toEqual({
        ...projectsInitialState,
        projects: initialProjectsCollection,
      });
    });
  });

  describe('YataApiActions.loadProjectsSuccess', () => {
    it('should set the currentProjectId to null', () => {
      const { initialProjectsState: projectsInitialState } = fromProjects;
      const projects: Project[] = [
        { id: 1, name: 'Project 1' },
        { id: 2, name: 'Project 2' },
      ];

      const action = YataApiActions.loadProjectsSuccess({
        projects,
      });

      const state = fromProjects.reducer(projectsInitialState, action);

      expect(state).toEqual({
        ...projectsInitialState,
        projects,
      });
    });
  });

  describe('YataApiActions.updateProjectSuccess', () => {
    it('should set the currentProjectId to null', () => {
      const initialState: fromProjects.ProjectsState = {
        currentProjectId: 1,
        projects: [{ id: 1, name: 'Project 1' }],
      };

      const updatedProject: Project = { id: 1, name: 'Updated Project Name' };

      const action = YataApiActions.updateProjectSuccess({
        project: updatedProject,
      });

      const state = fromProjects.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        projects: [updatedProject],
      });
    });
  });
});
