import { TaskView } from '../../interfaces';

export interface UserPreference {
  isDarkTheme?: boolean;
  defaultDueDateToday?: boolean;
  taskView?: TaskView;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  givenName?: string;
  familyName?: string;
  preferences?: UserPreference | null;
  createdAt?: string;
  updatedAt?: string;
}

export namespace User {
  export enum Password {
    MinLength = 6,
  }
}
