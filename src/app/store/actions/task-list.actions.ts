import { createActionGroup, props } from '@ngrx/store';
import { Section, Task } from '../../models';

export const TaskListActions = createActionGroup({
  source: 'Task List',
  events: {
    'Move Task': props<{
      source?: Section;
      target?: Section;
      task: Partial<Task>;
    }>(),
  },
});
