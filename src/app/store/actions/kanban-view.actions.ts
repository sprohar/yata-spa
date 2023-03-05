import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Project, Section, Task } from '../../models';

export const KanbanViewActions = createActionGroup({
  source: 'Kanban View',
  events: {
    'Switch to List View': props<{ project: Project }>(),
    'Create Section': props<{ section: Section }>(),
    'Delete Task': props<{ task: Task }>(),
    'Move Task To Section': props<{ task: Partial<Task> }>(),
    'Update Task': props<{ task: Partial<Task> }>(),
    'Update Section': props<{ section: Partial<Section> }>(),
    'Set Current Task Id': props<{ taskId: number }>(),
  },
});
