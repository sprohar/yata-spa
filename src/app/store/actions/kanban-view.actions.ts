import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Project, Section, Task } from '../../models';

export const KanbanViewActions = createActionGroup({
  source: 'Kanban View',
  events: {
    'Switch to List View': props<{ project: Project }>(),
    'Create Section': props<{ section: Section }>(),
    'Delete Task': props<{ task: Task }>(),
    'Delete Section': props<{ section: Section }>(),
    'Update Task': props<{ task: Partial<Task> }>(),
    'Update Section': props<{ section: Partial<Section> }>(),
    'Set Current Task Id': props<{ taskId: number }>(),
    'Set Current Section Id': props<{ sectionId: number }>(),
    'Reset Current Section Id': emptyProps(),
    'Close Edit Section Dialog': emptyProps(),
  },
});
