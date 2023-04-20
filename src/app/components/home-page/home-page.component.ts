import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/reducers/auth.reducer';

@Component({
  selector: 'yata-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  user$ = this.store.select(selectUser);

  constructor(private store: Store) {}
}
