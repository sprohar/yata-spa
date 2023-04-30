import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/actions';

@Component({
  selector: 'yata-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferencesComponent {
  constructor(private readonly store: Store) {}

  handleSignOut() {
    this.store.dispatch(AuthActions.logout());
  }
}
