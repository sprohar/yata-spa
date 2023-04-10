import { createActionGroup, props } from '@ngrx/store';
import { Task } from '../../models';

export const CreateTaskComponentActions = createActionGroup({
  source: 'Create Task',
  events: {
    'Create Task': props<{ task: Task }>(),
    'Create Subtask': props<{ subtask: Task }>(),
  },
});
