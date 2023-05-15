import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppearanceSettingComponent } from './components/appearance-setting/appearance-setting.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { PreferencesComponent } from './preferences.component';

// TODO: Refactor this component to use the new router API
const routes: Routes = [
  {
    path: '',
    component: PreferencesComponent,
    children: [
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
  {
    path: 'appearance',
    component: AppearanceSettingComponent,
  },
  {
    path: 'general',
    component: GeneralSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesRoutingModule {}
