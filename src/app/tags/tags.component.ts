import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTasks } from '../store/selectors';
import { selectCurrentTag } from '../store/selectors/tags.selectors';

@Component({
  selector: 'yata-tags',
  styleUrls: ['./tags.component.scss'],
  templateUrl: './tags.component.html',
})
export class TagsComponent {
  currentTag$ = this.store.select(selectCurrentTag);
  tasks$ = this.store.select(selectTasks);

  constructor(private store: Store) { }
}
