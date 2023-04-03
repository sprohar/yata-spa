import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Priority, Task } from '../models';
import { selectTasksGroupByPriority } from '../store/selectors';

@Component({
  selector: 'yata-eisenhower-matrix',
  templateUrl: './eisenhower-matrix.component.html',
  styleUrls: ['./eisenhower-matrix.component.scss'],
})
export class EisenhowerMatrixComponent {
  readonly HIGH_PRIORITY = Priority.HIGH;
  readonly MEDIUM_PRIORITY = Priority.MEDIUM;
  readonly LOW_PRIORITY = Priority.LOW;
  readonly NO_PRIORITY = Priority.NONE;

  tasksGroupedByPriority$: Observable<Map<Priority, Task[]>> =
    this.store.select(selectTasksGroupByPriority);

  constructor(private store: Store) {}
}
