import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Priority, Task } from '../../models';
import {
  selectCompletedHighPriorityTasks,
  selectCompletedLowPriorityTasks,
  selectCompletedMediumPriorityTasks,
  selectCompletedNoPriorityTasks,
  selectHighPriorityTasksGroupByProject,
  selectLowPriorityTasksGroupByProject,
  selectMediumPriorityTasksGroupByProject,
  selectNoPriorityTasksGroupByProject,
  selectTasksGroupByPriority,
} from '../../store/selectors';
import { MatrixQuadrantComponent } from './components/matrix-quadrant/matrix-quadrant.component';

@Component({
  selector: 'yata-eisenhower-matrix',
  templateUrl: './eisenhower-matrix.component.html',
  styleUrls: ['./eisenhower-matrix.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    CdkDropListGroup,
    MatrixQuadrantComponent,
    RouterOutlet,
    AsyncPipe,
  ],
})
export class EisenhowerMatrixComponent {
  readonly HIGH_PRIORITY = Priority.HIGH;
  readonly MEDIUM_PRIORITY = Priority.MEDIUM;
  readonly LOW_PRIORITY = Priority.LOW;
  readonly NO_PRIORITY = Priority.NONE;

  tasksGroupedByPriority$: Observable<Map<Priority, Task[]>> =
    this.store.select(selectTasksGroupByPriority);

  noPriorityGroup$ = this.store.select(selectNoPriorityTasksGroupByProject);
  lowPriorityGroup$ = this.store.select(selectLowPriorityTasksGroupByProject);
  mediumPriorityGroup$ = this.store.select(
    selectMediumPriorityTasksGroupByProject
  );
  highPriorityGroup$ = this.store.select(selectHighPriorityTasksGroupByProject);

  noPriorityCompletedTasks$ = this.store.select(selectCompletedNoPriorityTasks);
  lowPriorityCompletedTasks$ = this.store.select(
    selectCompletedLowPriorityTasks
  );
  mediumPriorityCompletedTasks$ = this.store.select(
    selectCompletedMediumPriorityTasks
  );
  highPriorityCompletedTasks$ = this.store.select(
    selectCompletedHighPriorityTasks
  );

  constructor(private readonly store: Store) {}
}
