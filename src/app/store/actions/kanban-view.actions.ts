import { createActionGroup, props } from '@ngrx/store';
import { Project } from '../../models';

export const KanbanViewActions = createActionGroup({
  source: 'Kanban View',
  events: {
    'Switch to List View': props<{ project: Project }>(),
  },
});
