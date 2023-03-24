import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCategorizedTasks, selectCurrentTag } from '../store/selectors';

@Component({
  selector: 'yata-tags',
  styleUrls: ['./tags.component.scss'],
  templateUrl: './tags.component.html',
})
export class TagsComponent {
  currentTag$ = this.store.select(selectCurrentTag);
  sections$ = this.store.select(selectCategorizedTasks);

  constructor(private store: Store) {}
}
