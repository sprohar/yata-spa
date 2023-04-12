import { ProjectsState, selectCurrentProjectId, selectProjects } from "../reducers/projects.reducer";
import { selectCurrentProject } from "./projects.selectors";

describe('Projects Selectors', () => {
  const state: ProjectsState = {
    currentProjectId: 1,
    projects: [
      {
        id: 1,
        name: 'Project 1',
      },
      {
        id: 2,
        name: 'Project 2',
      },
    ],
  };

  it('should select the current project id', () => {
    expect(selectCurrentProjectId.projector(state)).toEqual(1);
  });

  it('should select the current project', () => {
    expect(selectCurrentProject.projector(state.currentProjectId, state.projects)).toEqual({
      id: 1,
      name: 'Project 1',
    });
  });
});
