import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../models';

export const TasksOrderByOptions = createActionGroup({
  source: 'Tasks Order By Options',
  events: {
    'Set Order By': props<{ orderBy: Task.OrderBy }>(),
    'Clear Order By': emptyProps(),
  },
});
