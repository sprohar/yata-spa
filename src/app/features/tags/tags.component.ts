import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrentTag,
  selectTasksGroupByProject,
} from '../../store/selectors';

@Component({
  selector: 'yata-tags',
  styleUrls: ['./tags.component.scss'],
  templateUrl: './tags.component.html',
})
export class TagsComponent {
  currentTag$ = this.store.select(selectCurrentTag);
  tasksGroupedByTags$ = this.store.select(selectTasksGroupByProject);

  constructor(private store: Store) {}
}
