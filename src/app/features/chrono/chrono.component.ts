import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'yata-chrono',
  template: ` <router-outlet></router-outlet> `,
  standalone: true,
  imports: [RouterOutlet],
})
export class ChronoComponent {}
