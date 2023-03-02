import { createActionGroup, props } from '@ngrx/store';
import { Subtask } from '../../models';

export const SubtasksListItemActions = createActionGroup({
  source: 'Subtasks',
  events: {
    'Create Subtask': props<{ subtask: Subtask }>(),
    'Delete Subtask': props<{ subtask: Subtask }>(),
    'Update Subtask': props<{ subtask: Partial<Subtask> }>(),
  },
});
