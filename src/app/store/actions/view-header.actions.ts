import { createActionGroup, props } from '@ngrx/store';
import { Project } from '../../models';

export const ViewHeaderActions = createActionGroup({
  source: 'View Header',
  events: {
    'Delete Project': props<{ project: Project }>(),
    'Update Project': props<{ project: Project }>(),
  },
});
