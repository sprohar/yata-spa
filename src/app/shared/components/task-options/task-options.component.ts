import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Section, Task } from '../../../models';
import { TaskOptionsActions } from '../../../store/actions/task-options.actions';
import { selectMoveToSectionsOptions } from '../../../store/selectors';
import { SubtaskDetailsDailogComponent } from '../subtask-details-dailog/subtask-details-dailog.component';

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
    private router: Router,
    private dialog: MatDialog
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

  openSubtaskDetailsDialog(subtask: Task) {
    this.dialog.open(SubtaskDetailsDailogComponent, {
      data: subtask,
    });
  }

  handleViewTaskDetails() {
    if (this.task.parentId) {
      this.openSubtaskDetailsDialog(this.task);
      return;
    }

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
