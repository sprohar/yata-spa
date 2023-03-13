import { createActionGroup, props } from '@ngrx/store';
import { Project } from '../../models';

export const SidenavActions = createActionGroup({
  source: 'Sidenav',
  events: {
    'Project Selected': props<{ projectId: number }>(),
    'Create Project': props<{ project: Project }>(),
  },
});
