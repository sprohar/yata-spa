import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Section } from '../../models';

export const EditSectionDialogActions = createActionGroup({
  source: 'Edit Section Dialog',
  events: {
    'On Init': props<{ section: Section }>(),
    'On Destroy': emptyProps(),
  },
});
