import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'yata-chrono',
  styles: [
    `
      main {
        padding: 16px;
      }
    `,
  ],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class ChronoComponent {}
