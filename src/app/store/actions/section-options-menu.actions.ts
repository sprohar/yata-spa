import { createActionGroup, props } from '@ngrx/store';
import { Section } from '../../models';

export const SectionOptionsMenuActions = createActionGroup({
  source: 'Section Options Menu',
  events: {
    'Delete Section': props<{ section: Section }>(),
    'Move To Project': props<{
      sourceProjectId: number;
      targetProjectId: number;
      section: Section;
    }>(),
  },
});
