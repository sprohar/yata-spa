import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../store/actions';

@Component({
  selector: 'yata-preferences-nav-list',
  templateUrl: './preferences-nav-list.component.html',
  styleUrls: ['./preferences-nav-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatListModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatDividerModule,
  ],
})
export class PreferencesNavListComponent {
  constructor(private readonly store: Store) {}

  handleSignOut() {
    this.store.dispatch(AuthActions.logout());
  }
}
