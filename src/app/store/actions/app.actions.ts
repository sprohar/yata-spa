import { createActionGroup, emptyProps } from '@ngrx/store';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'On Init': emptyProps(),
  },
});
