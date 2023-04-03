import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTasksGroupByDueDate } from '../../../store/selectors';

@Component({
  selector: 'yata-next-seven-days',
  templateUrl: './next-seven-days.component.html',
  styleUrls: ['./next-seven-days.component.scss'],
})
export class NextSevenDaysComponent {
  map$ = this.store.select(selectTasksGroupByDueDate);

  constructor(private store: Store) {}
}
