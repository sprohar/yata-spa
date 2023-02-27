import { createActionGroup, props } from '@ngrx/store';
import { Project } from '../../models';

export const ListViewActions = createActionGroup({
  source: 'List View',
  events: {
    'Switch to Kanban View': props<{ project: Project }>(),
  },
});
