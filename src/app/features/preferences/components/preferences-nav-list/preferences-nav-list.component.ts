import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../store/actions';

@Component({
  selector: 'yata-preferences-nav-list',
  templateUrl: './preferences-nav-list.component.html',
  styleUrls: ['./preferences-nav-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferencesNavListComponent {
  constructor(private readonly store: Store) {}

  handleSignOut() {
    this.store.dispatch(AuthActions.logout());
  }
}
