import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/reducers/auth.reducer';

@Component({
  selector: 'yata-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  user$ = this.store.select(selectUser);

  constructor(private store: Store) {}
}
