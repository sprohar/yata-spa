import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'yata-chrono',
  template: ` <router-outlet></router-outlet> `,
})
export class ChronoComponent {}
