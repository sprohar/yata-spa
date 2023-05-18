import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Section, Task } from '../../../models';
import { ConfirmationDialogService } from '../../../services';
import { TaskOptionsActions } from '../../../store/actions/task-options.actions';
import { selectMoveToSectionsOptions } from '../../../store/selectors';

@Component({
  selector: 'yata-task-options',
  templateUrl: './task-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
})
export class TaskOptionsComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  readonly sections$ = this.store.select(selectMoveToSectionsOptions);

  @Input() task!: Task;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly confirmationDialog: ConfirmationDialogService
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
