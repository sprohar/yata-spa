import { createActionGroup, props } from '@ngrx/store';
import { Task } from '../../models';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Update Task': props<{ task: Partial<Task> }>(),
  },
});
