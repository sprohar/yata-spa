import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppearanceComponent } from './components/appearance/appearance.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
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
  {
    path: '',
    redirectTo: '/app/settings/appearance',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
