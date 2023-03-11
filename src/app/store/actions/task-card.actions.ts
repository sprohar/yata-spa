import { createActionGroup, props } from '@ngrx/store';
import { Task } from '../../models';

export const TaskCardActions = createActionGroup({
  source: 'Task Card',
  events: {
    'Update Task': props<{ task: Partial<Task> }>(),
    'View Task Details': props<{ taskId: number }>(),
  },
});
