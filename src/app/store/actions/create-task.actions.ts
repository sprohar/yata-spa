import { createActionGroup, props } from '@ngrx/store';
import { Task } from '../../models';

export const CreateTaskActions = createActionGroup({
  source: 'Create Task',
  events: {
    'Create Task': props<{ task: Task }>(),
  },
});
