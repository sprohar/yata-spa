import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../models';
import {
  selectHighPriorityTasks,
  selectLowPriorityTasks,
  selectMediumPriorityTasks,
  selectNoPriorityTasks,
} from '../store/selectors';

@Component({
  selector: 'yata-eisenhower-matrix',
  templateUrl: './eisenhower-matrix.component.html',
  styleUrls: ['./eisenhower-matrix.component.scss'],
})
export class EisenhowerMatrixComponent {
  readonly HIGH_PRIORITY = Task.Priority.HIGH;
  readonly MEDIUM_PRIORITY = Task.Priority.MEDIUM;
  readonly LOW_PRIORITY = Task.Priority.LOW;
  readonly NO_PRIORITY = Task.Priority.NONE;

  noPriorityTasks$ = this.store.select(selectNoPriorityTasks);
  lowPriorityTasks$ = this.store.select(selectLowPriorityTasks);
  mediumPriorityTasks$ = this.store.select(selectMediumPriorityTasks);
  highPriorityTasks$ = this.store.select(selectHighPriorityTasks);

  constructor(private store: Store) { }
}
