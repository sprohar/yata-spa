import { createActionGroup, props } from '@ngrx/store';
import { Project, Tag } from '../../models';

export const SidenavActions = createActionGroup({
  source: 'Sidenav',
  events: {
    'Project Selected': props<{ projectId: number }>(),
    'Create Project': props<{ project: Project }>(),
    'Delete Project': props<{ project: Project }>(),
    'Create Tag': props<{ tag: Tag }>(),
    'Select Tag': props<{ tagId: number }>(),
    'Edit Tag': props<{ tag: Tag }>(),
    'Delete Tag': props<{ tag: Tag }>(),
  },
});
