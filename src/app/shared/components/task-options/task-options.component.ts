import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Section, Task } from '../../../models';
import { ConfirmationDialogService } from '../../../services';
import { TaskOptionsActions } from '../../../store/actions/task-options.actions';
import { selectMoveToSectionsOptions } from '../../../store/selectors';
import { SubtaskDetailsDailogComponent } from '../subtask-details-dailog/subtask-details-dailog.component';

@Component({
  selector: 'yata-task-options',
  templateUrl: './task-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskOptionsComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  @Input() task!: Task;
  sections$ = this.store.select(selectMoveToSectionsOptions);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private confirmationDialog: ConfirmationDialogService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  trackBySectionId(_index: number, section: Section) {
    return section.id;
  }

  handleDelete() {
    const ref = this.confirmationDialog.open({
      title: 'Delete Task',
      message: 'Are you sure you want to delete this task?',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    ref.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.store.dispatch(
          TaskOptionsActions.deleteTask({
            task: this.task,
          })
        );
      }
    });
  }

  handleDuplicate() {
    this.store.dispatch(
      TaskOptionsActions.duplicateTask({
        task: this.task,
      })
    );
  }

  handleViewTaskDetails() {
    if (this.task.parentId) {
      this.dialog.open(SubtaskDetailsDailogComponent, {
        data: this.task,
      });
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
