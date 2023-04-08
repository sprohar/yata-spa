import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Section, Task } from '../../../models';
import { TaskOptionsActions } from '../../../store/actions/task-options.actions';
import { selectMoveToSectionsOptions } from '../../../store/selectors';

@Component({
  selector: 'yata-task-options',
  templateUrl: './task-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskOptionsComponent {
  @Input() task!: Task;
  sections$ = this.store.select(selectMoveToSectionsOptions);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  trackBySectionId(_index: number, section: Section) {
    return section.id;
  }

  handleDelete() {
    this.store.dispatch(
      TaskOptionsActions.deleteTask({
        task: this.task,
      })
    );
  }

  handleDuplicate() {
    this.store.dispatch(
      TaskOptionsActions.duplicateTask({
        task: this.task,
      })
    );
  }

  handleViewTaskDetails() {
    const url = this.router.url;
    if (url.split('/').includes('matrix')) {
      this.router.navigate(['p', this.task.projectId, 'tasks', this.task.id!], {
        relativeTo: this.route,
      });
    } else {
      this.router.navigate(['tasks', this.task.id!], {
        relativeTo: this.route,
      });
    }
  }
}
