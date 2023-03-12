import { createActionGroup, props } from '@ngrx/store';
import { Project } from '../../models';

export const EditProjectDialogActions = createActionGroup({
  source: 'Edit Project Dialog',
  events: {
    'Update Project': props<{ project: Project }>(),
  },
});
