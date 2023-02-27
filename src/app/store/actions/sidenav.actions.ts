import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Project } from '../../models';

export const SidenavActions = createActionGroup({
  source: 'Sidenav',
  events: {
    'On Init': emptyProps(),
    'Project Selected': props<{ projectId: number }>(),
    'Create Project': props<{ project: Project }>(),
  },
});
