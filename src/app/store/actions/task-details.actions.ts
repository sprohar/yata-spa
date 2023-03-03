import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Subtask, Task } from '../../models';

export const TaskDetailsActions = createActionGroup({
  source: 'Task Details',
  events: {
    'Reset Current Task Id': emptyProps(),
    'Update Task': props<{ task: Partial<Task> }>(),
    'Move Task To Project': props<{ task: Partial<Task> }>(),
    'Create Subtask': props<{ subtask: Subtask }>(),
    'Delete Subtask': props<{ subtask: Subtask }>(),
    'Update Subtask': props<{ subtask: Partial<Subtask> }>(),
  },
});
