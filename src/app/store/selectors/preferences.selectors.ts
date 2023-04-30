import { createSelector } from '@ngrx/store';
import { User } from '../../auth/models/user.model';
import { selectUser } from '../reducers/auth.reducer';

export const selectUserPreferences = createSelector(
  selectUser,
  (user: User | null) => (user && user.preferences ? user.preferences : null)
);
