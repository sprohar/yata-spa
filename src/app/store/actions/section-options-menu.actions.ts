import { createActionGroup, props } from '@ngrx/store';
import { Section } from '../../models';

export const SectionOptionsMenuActions = createActionGroup({
  source: 'Section Options Menu',
  events: {
    'Delete Section': props<{ section: Section }>(),
  },
});
