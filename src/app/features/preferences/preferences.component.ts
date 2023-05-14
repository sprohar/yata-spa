import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreferencesNavListComponent } from './components/preferences-nav-list/preferences-nav-list.component';

@Component({
  selector: 'yata-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PreferencesNavListComponent, RouterOutlet],
})
export class PreferencesComponent {}
