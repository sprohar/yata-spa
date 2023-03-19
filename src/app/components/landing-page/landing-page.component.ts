import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/actions';
import {
  selectAccessToken,
  selectIsAuthenticated,
  selectUser,
} from '../../store/reducers/auth.reducer';

@Component({
  selector: 'yata-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  user$ = this.store.select(selectUser);

  constructor(private store: Store) {}
}
