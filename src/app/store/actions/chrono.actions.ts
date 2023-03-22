import { createActionGroup, emptyProps } from '@ngrx/store';

export const ChronoActions = createActionGroup({
  source: 'Chrono',
  events: {
    'Get Todays Tasks': emptyProps(),
    'Get Next Seven Days Tasks': emptyProps(),
  },
});
