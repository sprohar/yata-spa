import { createActionGroup, props } from '@ngrx/store';
import { Project, Task } from '../../models';

export const ListViewActions = createActionGroup({
  source: 'List View',
  events: {
    'Switch to Kanban View': props<{ project: Project }>(),
    'Mark Task As Complete': props<{ task: Task }>(),
    'Mark Task As Incomplete': props<{ task: Task }>(),
  },
});
