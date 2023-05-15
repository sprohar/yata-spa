import { NgModule } from '@angular/core';

import { AppearanceSettingComponent } from './components/appearance-setting/appearance-setting.component';
import { DefaultDueDateSettingComponent } from './components/default-due-date-setting/default-due-date-setting.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { PreferencesNavListComponent } from './components/preferences-nav-list/preferences-nav-list.component';
import { TaskViewSettingComponent } from './components/task-view-setting/task-view-setting.component';
import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesComponent } from './preferences.component';

@NgModule({
  imports: [
    PreferencesRoutingModule,
    AppearanceSettingComponent,
    PreferencesComponent,
    GeneralSettingsComponent,
    TaskViewSettingComponent,
    DefaultDueDateSettingComponent,
    PreferencesNavListComponent,
  ],
})
export class PreferencesModule {}
