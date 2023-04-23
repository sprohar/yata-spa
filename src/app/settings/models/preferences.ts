export enum PreferencesOption {
  DEFAULT_DUE_DATE_TODAY = 'defaultDueDateToday',
}

export interface Preferences {
  [key: string]: number | boolean | string;
}
