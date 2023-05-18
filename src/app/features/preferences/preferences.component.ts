import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointService } from '../../services';
import { PreferencesNavListComponent } from './components/preferences-nav-list/preferences-nav-list.component';

@Component({
  selector: 'yata-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, PreferencesNavListComponent, RouterOutlet],
})
export class PreferencesComponent {
  readonly isHandset$ = this.breakpointService.isHandset$;

  constructor(private readonly breakpointService: BreakpointService) {}
}
