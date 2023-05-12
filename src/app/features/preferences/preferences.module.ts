import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppearanceSettingComponent } from './components/appearance-setting/appearance-setting.component';
import { DefaultDueDateSettingComponent } from './components/default-due-date-setting/default-due-date-setting.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { PreferencesMobileView } from './components/preferences-mobile-view/preferences-mobile-view.component';
import { PreferencesNavListComponent } from './components/preferences-nav-list/preferences-nav-list.component';
import { TaskViewSettingComponent } from './components/task-view-setting/task-view-setting.component';
import { SettingsRoutingModule } from './preferences-routing.module';
import { PreferencesComponent } from './preferences.component';

@NgModule({
  declarations: [
    AppearanceSettingComponent,
    PreferencesComponent,
    GeneralSettingsComponent,
    TaskViewSettingComponent,
    DefaultDueDateSettingComponent,
    PreferencesNavListComponent,
    PreferencesMobileView,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatRadioModule,
  ],
})
export class PreferencesModule {}
