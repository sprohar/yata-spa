import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/actions';

@Component({
  selector: 'yata-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  constructor(private readonly store: Store) {}

  handleSignOut() {
    this.store.dispatch(AuthActions.logout());
  }
}
