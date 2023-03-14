import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Project, Task } from '../../../models';
import { TaskDetailsDialogComponent } from '../../../shared/components/task-details-dialog/task-details-dialog.component';
import { EisenhowerMatrixActions } from '../../../store/actions';
import { selectProjects } from '../../../store/selectors';

@Component({
  selector: 'yata-matrix-task-list',
  templateUrl: './matrix-task-list.component.html',
  styleUrls: ['./matrix-task-list.component.scss'],
})
export class MatrixTaskListComponent implements OnInit {
  @Input() tasks!: Task[];
  projects$ = this.store.select(selectProjects);

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (!this.tasks) {
      throw new Error('Method not implemented.');
    }
  }

  openTaskDetailsDialog(task: Task) {
    this.store.dispatch(
      EisenhowerMatrixActions.viewTaskDetails({
        taskId: task.id!,
      })
    );

    this.dialog.open(TaskDetailsDialogComponent);
  }

  getProjectName(projectId: number, projects: Project[]) {
    return projects.find((p) => p.id === projectId)?.name ?? '';
  }
}
