import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TasksOrderByState } from '../reducers/tasks.reducer';

export const TasksOrderByOptionsActions = createActionGroup({
  source: 'Tasks Order By Options',
  events: {
    'Set Order By': props<{ orderBy: TasksOrderByState }>(),
    'Clear Order By': emptyProps(),
  },
});
