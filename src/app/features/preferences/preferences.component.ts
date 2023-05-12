import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'yata-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferencesComponent {}
