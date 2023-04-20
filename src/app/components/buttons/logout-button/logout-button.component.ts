import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'yata-logout-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      data-test="logoutButton"
      id="logout"
      mat-list-item
      class="flex align-items-center"
      (click)="handleLogout()"
    >
      <mat-icon>logout</mat-icon>
      <span>Sign out</span>
    </div>
  `,
})
export class LogoutButtonComponent {
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private auth: AuthService
  ) {}

  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin,
      },
    });
  }
}
