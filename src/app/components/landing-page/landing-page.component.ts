import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/actions';
import {
  selectAccessToken,
  selectIsAuthenticated,
} from '../../store/reducers/auth.reducer';

@Component({
  selector: 'yata-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  token$ = this.store.select(selectAccessToken);

  constructor(private store: Store) {}

  handleRefresh() {
    this.store.dispatch(AuthActions.refreshToken());
  }
}
