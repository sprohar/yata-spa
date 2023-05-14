import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DefaultDueDateSettingComponent } from '../default-due-date-setting/default-due-date-setting.component';
import { TaskViewSettingComponent } from '../task-view-setting/task-view-setting.component';

@Component({
  selector: 'yata-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCardModule,
    DefaultDueDateSettingComponent,
    TaskViewSettingComponent,
  ],
})
export class GeneralSettingsComponent {
  constructor() {}
}
