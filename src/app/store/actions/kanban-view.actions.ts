import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Project, Section, Task } from '../../models';

export const KanbanViewActions = createActionGroup({
  source: 'Kanban View',
  events: {
    'Switch to List View': props<{ project: Project }>(),
    'Create Section': props<{ section: Section }>(),
    'Delete Task': props<{ task: Task }>(),
    'Delete Section': props<{ section: Section }>(),
    'Update Task': props<{ task: Task }>(),
    'Update Section': props<{ section: Section }>(),
    'Set Current Task Id': props<{ taskId: number | null }>(),
    'Set Current Section Id': props<{ sectionId: number | null }>(),
    'Close Edit Section Dialog': emptyProps(),
  },
});
