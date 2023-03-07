import { createActionGroup, props } from '@ngrx/store';
import { Task } from '../../models';

export const TaskOptionsMenuActions = createActionGroup({
  source: 'Task Options Menu',
  events: {
    'Delete Task': props<{ task: Task }>(),
    'Duplicate Task': props<{ task: Task }>(),
    'View Task Details': props<{ taskId: number }>(),
  },
});
