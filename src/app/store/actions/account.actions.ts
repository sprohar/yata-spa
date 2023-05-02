import { createActionGroup, emptyProps } from '@ngrx/store';

export const AccountActions = createActionGroup({
  source: 'Account',
  events: {
    'Delete Account': emptyProps(),
  },
});
