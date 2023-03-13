import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const EisenhowerMatrixActions = createActionGroup({
  source: 'Eisenhower Matrix',
  events: {
    'On Init': emptyProps(),
    'View Task Details': props<{ taskId: number }>(),
  },
});
