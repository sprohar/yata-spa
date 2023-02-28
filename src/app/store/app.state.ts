import { ProjectsState } from './reducers/projects.reducer';
import { SectionsState } from './reducers/sections.reducer';
import { TasksState } from './reducers/tasks.reducer';

export interface AppState {
  projects: ProjectsState;
  sections: SectionsState;
  tasks: TasksState;
}
