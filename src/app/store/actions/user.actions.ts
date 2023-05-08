import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../auth/models/user.model';

export const UserActions = createActionGroup({
  source: 'Profile',
  events: {
    'Delete User': emptyProps(),
    'Update User': props<{ user: User }>(),
  },
});
