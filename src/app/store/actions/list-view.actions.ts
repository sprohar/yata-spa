import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Project, Task } from '../../models';

export const ListViewActions = createActionGroup({
  source: 'List View',
  events: {
    'Switch to Kanban View': props<{ project: Project }>(),
    'Move Task To Section': props<{ task: Partial<Task> }>(),
    'Create Task In Section': props<{ task: Task }>(),
    'Open Create Section Task List Item': props<{ sectionId: number }>(),
    'Close Create Section Task List Item': emptyProps(),
  },
});
