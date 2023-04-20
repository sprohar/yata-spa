import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'yata-login-button',
  template: `
    <button mat-raised-button color="primary" (click)="handleLogin()">
      Sign in
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginButtonComponent {
  constructor(private auth: AuthService) {}

  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/app',
        returnTo: '/app',
      },
    });
  }
}
