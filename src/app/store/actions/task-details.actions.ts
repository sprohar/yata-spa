import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Tag, Task } from '../../models';

export const TaskDetailsActions = createActionGroup({
  source: 'Task Details',
  events: {
    'Reset Current Task Id': emptyProps(),
    'Update Task': props<{ task: Partial<Task> }>(),
    'Move Task To Project': props<{ task: Partial<Task> }>(),
    'Create Subtask': props<{ subtask: Task }>(),
    'Delete Subtask': props<{ subtask: Task }>(),
    'Update Subtask': props<{ subtask: Partial<Task> }>(),
    'Remove Tag From Task': props<{ task: Task; tag: Tag }>(),
    'Create Tag': props<{ tag: Tag }>(),
  },
});
