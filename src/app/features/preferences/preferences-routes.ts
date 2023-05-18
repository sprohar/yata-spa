import { Routes } from '@angular/router';
import { AppearanceSettingComponent } from './components/appearance-setting/appearance-setting.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { PreferencesComponent } from './preferences.component';

export const preferencesRoutes: Routes = [
  {
    path: '',
    component: PreferencesComponent,
    children: [
      {
        path: '',
        redirectTo: 'appearance',
        pathMatch: 'full',
      },
      {
        path: 'appearance',
        component: AppearanceSettingComponent,
      },
      {
        path: 'general',
        component: GeneralSettingsComponent,
      },
    ],
  },
];
