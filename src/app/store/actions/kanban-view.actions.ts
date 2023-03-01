import { createActionGroup, props } from '@ngrx/store';
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
  },
});
