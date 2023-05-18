import { Component } from '@angular/core';

@Component({
  selector: 'yata-logo',
  template: `
    <div class="flex">
      <img id="logo" src="assets/images/logo.png" alt="logo" />
    </div>
  `,
  styles: [
    `
      #logo {
        max-height: inherit;
        height: 300px;
        width: auto;
      }

      @media only screen and (min-width: 600px) {
        #logo {
          min-height: 500px;
          width: auto;
        }
      }
    `,
  ],
  standalone: true,
})
export class LogoComponent {}
