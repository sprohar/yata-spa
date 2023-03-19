import { AuthState } from './reducers/auth.reducer';
import { ProjectsState } from './reducers/projects.reducer';
import { SectionsState } from './reducers/sections.reducer';
import { TasksState } from './reducers/tasks.reducer';

export interface AppState {
  auth: AuthState;
  projects: ProjectsState;
  sections: SectionsState;
  tasks: TasksState;
}
