import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Subtask } from '../../models';

export const TaskDetailsActions = createActionGroup({
  source: 'Task Details',
  events: {
    'Clear Current Task Id': emptyProps(),
    'Create Subtask': props<{ subtask: Subtask }>(),
    'Delete Subtask': props<{ subtask: Subtask }>(),
    'Update Subtask': props<{ subtask: Partial<Subtask> }>(),
  },
});
