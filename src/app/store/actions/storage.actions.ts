import { createActionGroup, props } from '@ngrx/store';
import { StorageKeys } from '../../storage/storage.keys';

export const StorageActions = createActionGroup({
  source: 'Local Storage',
  events: {
    'Set Item Success': props<Record<StorageKeys, string | Object>>(),
  },
});
