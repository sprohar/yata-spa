import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountActions } from '../../store/actions';
import { selectUser } from '../../store/reducers/auth.reducer';

@Component({
  selector: 'yata-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  readonly user$ = this.store.select(selectUser);

  constructor(private readonly store: Store) {}

  handleDeleteAccount() {
    this.store.dispatch(AccountActions.deleteAccount());
  }
}
