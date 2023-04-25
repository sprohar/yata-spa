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
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SettingsEffects } from '../store/effects/settings.effects';
import { settingsFeature } from '../store/reducers/settings.reducer';
import { AppearanceComponent } from './components/appearance/appearance.component';
import { DefaultDueDateSetting } from './components/default-due-date-setting/default-due-date-setting.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { TaskViewSettingComponent } from './components/task-view-setting/task-view-setting.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [
    SettingsComponent,
    AppearanceComponent,
    GeneralSettingsComponent,
    TaskViewSettingComponent,
    DefaultDueDateSetting,
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
    StoreModule.forFeature(settingsFeature),
    EffectsModule.forFeature(SettingsEffects),
  ],
})
export class SettingsModule {}
