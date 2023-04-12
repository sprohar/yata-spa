import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentTag, selectTasksGroupedByTag } from '../store/selectors';

@Component({
  selector: 'yata-tags',
  styleUrls: ['./tags.component.scss'],
  templateUrl: './tags.component.html',
})
export class TagsComponent {
  currentTag$ = this.store.select(selectCurrentTag);
  groupedTasks$ = this.store.select(selectTasksGroupedByTag);

  constructor(private store: Store) {}
}
