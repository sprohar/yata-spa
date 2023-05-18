import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'yata-auth-view',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet],
  template: ` <mat-sidenav-container class="full-height">
    <mat-sidenav-content>
      <router-outlet></router-outlet>
    </mat-sidenav-content>
  </mat-sidenav-container>`,
})
export class AuthViewComponent {}
