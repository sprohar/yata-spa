import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../models';

export const EisenhowerMatrixActions = createActionGroup({
  source: 'Eisenhower Matrix',
  events: {
    'On Init': emptyProps(),
    'View Task Details': props<{ taskId: number }>(),
    'Move Task': props<{ task: Task }>(),
  },
});
