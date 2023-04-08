import { createActionGroup, props } from '@ngrx/store';
import { Task } from '../../models';

export const TaskOptionsActions = createActionGroup({
  source: 'Task Options Menu',
  events: {
    'Delete Task': props<{ task: Task }>(),
    'Duplicate Task': props<{ task: Task }>(),
    'View Details': props<{ task: Task }>(),
  },
});
