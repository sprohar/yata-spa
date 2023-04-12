import { createActionGroup, props } from '@ngrx/store';
import { Section } from '../../models';

export const SectionOptionsActions = createActionGroup({
  source: 'Section Options',
  events: {
    'Delete Section': props<{ section: Section }>(),
    'Move To Project': props<{
      sourceProjectId: number;
      targetProjectId: number;
      section: Section;
    }>(),
  },
});
