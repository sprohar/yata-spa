import { createActionGroup, props } from '@ngrx/store';

export const TaskResolverActions = createActionGroup({
  source: 'Task Resolver',
  events: {
    'Set Current Task Id': props<{ taskId: number }>(),
  },
});
