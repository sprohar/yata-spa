import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Section } from '../../models';

export const EditSectionDialogActions = createActionGroup({
  source: 'Edit Section Dialog',
  events: {
    'Update Section': props<{ section: Partial<Section> }>(),
  },
});
