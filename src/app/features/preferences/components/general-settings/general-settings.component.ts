import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'yata-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSettingsComponent {
  constructor() {}
}
