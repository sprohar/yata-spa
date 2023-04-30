import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppearanceComponent } from './components/appearance/appearance.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { PreferencesComponent } from './preferences.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'general',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PreferencesComponent,
    children: [
      {
        path: 'appearance',
        component: AppearanceComponent,
      },
      {
        path: 'general',
        component: GeneralSettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
