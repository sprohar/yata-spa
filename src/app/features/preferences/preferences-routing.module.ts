import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs';
import { BreakpointService } from '../../services';
import { AppearanceSettingComponent } from './components/appearance-setting/appearance-setting.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { PreferencesMobileView } from './components/preferences-mobile-view/preferences-mobile-view.component';
import { PreferencesNavListComponent } from './components/preferences-nav-list/preferences-nav-list.component';
import { PreferencesComponent } from './preferences.component';

const routes: Routes = [
  {
    path: '',
    component: PreferencesComponent,
    canActivate: [
      () =>
        inject(BreakpointService).isHandset$.pipe(
          map((isHandset) => (isHandset ? false : true))
        ),
    ],
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
    path: '',
    component: PreferencesMobileView,
    canActivate: [() => inject(BreakpointService).isHandset$],
    children: [
      {
        path: '',
        component: PreferencesNavListComponent,
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesRoutingModule {}
