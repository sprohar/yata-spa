import { createActionGroup, props } from '@ngrx/store';
import { Project, Section } from '../../models';

export const ViewHeaderActions = createActionGroup({
  source: 'View Header',
  events: {
    'Delete Project': props<{ project: Project }>(),
    'Create Section': props<{ section: Section }>(),
  },
});
