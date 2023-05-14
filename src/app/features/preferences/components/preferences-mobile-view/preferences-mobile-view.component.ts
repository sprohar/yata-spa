import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: '',
  template: `
    <div class="flex-column">
      <router-outlet></router-outlet>
    </div>
  `,
  standalone: true,
  imports: [RouterOutlet],
})
export class PreferencesMobileView {}
