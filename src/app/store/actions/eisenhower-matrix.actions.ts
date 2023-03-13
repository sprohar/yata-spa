import { createActionGroup, emptyProps } from '@ngrx/store';

export const EisenhowerMatrixActions = createActionGroup({
  source: 'Eisenhower Matrix',
  events: {
    'On Init': emptyProps(),
  },
});
