import { createActionGroup, emptyProps } from '@ngrx/store';

export const TaskDetailsActions = createActionGroup({
  source: 'Task Details',
  events: {
    'Clear Current Task Id': emptyProps(),
  },
});
