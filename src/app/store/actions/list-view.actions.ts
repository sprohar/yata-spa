import { createActionGroup, props } from '@ngrx/store';
import { Project, Task } from '../../models';

export const ListViewActions = createActionGroup({
  source: 'List View',
  events: {
    'Switch to Kanban View': props<{ project: Project }>(),
    'Mark Task As Complete': props<{ task: Partial<Task> }>(),
    'Mark Task As Incomplete': props<{ task: Partial<Task> }>(),
    'Move Task To Section': props<{ task: Partial<Task> }>(),
  },
});
