import { TaskView } from '../../interfaces';

export interface UserPreference {
  isDarkTheme?: boolean;
  defaultDueDateToday?: boolean;
  taskView?: TaskView;
}

export interface User {
  id?: string | null;
  email: string | null;
  emailVerified?: boolean | null;
  name?: string | null;
  preferences?: UserPreference | null;
  phoneNumber?: string | null;
  phoneVerified?: boolean | null;
  picture?: string | null;
  username?: string | null;
  nickname?: string | null;
  familyName?: string | null;
  givenName?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export namespace User {
  export enum Password {
    MinLength = 6,
  }
}
