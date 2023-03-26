import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EisenhowerMatrixActions } from '../../../store/actions';
import { Project, Task } from '../../../models';
import { selectProjects } from '../../../store/selectors';
import { MatrixListData } from '../../interfaces/matrix-list-data';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'yata-matrix-quadrant',
  templateUrl: './matrix-quadrant.component.html',
  styleUrls: ['./matrix-quadrant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixQuadrantComponent implements OnInit {
  @Input() tasks!: Task[];
  @Input() priority!: Task.Priority;
  completedTasks?: Task[];
  projects$ = this.store.select(selectProjects);
  showCompleted = true;

  constructor(private dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
    if (this.tasks) {
      this.completedTasks = this.tasks.filter((t) => t.completed);
    }
  }

  get headerText() {
    switch (this.priority) {
      case Task.Priority.HIGH:
        return 'Urgent & Important';
      case Task.Priority.MEDIUM:
        return 'Not Urgent & Important';
      case Task.Priority.LOW:
        return 'Urgent & Unimportant';
      case Task.Priority.NONE:
        return 'Not Urgent & Unimportant';
      default:
        return '';
    }
  }

  get textColorClassName() {
    return {
      'high-priority': this.priority === Task.Priority.HIGH,
      'medium-priority': this.priority === Task.Priority.MEDIUM,
      'low-priority': this.priority === Task.Priority.LOW,
      'no-priority': this.priority === Task.Priority.NONE,
    };
  }

  getProjectTasks(project: Project) {
    return this.tasks.filter((t) => t.projectId === project.id);
  }

  openCreateTaskDialog() {
    this.dialog.open(CreateTaskDialogComponent, {
      data: this.priority,
      minWidth: '350px',
    });
  }

  handleTaskDropped(event: CdkDragDrop<MatrixListData, MatrixListData, Task>) {
    const source: MatrixListData = event.previousContainer.data;
    const target: MatrixListData = event.container.data;
    const task: Task = event.item.data;

    if (
      source.projectId === target.projectId &&
      source.priority === target.priority
    ) {
      return;
    }

    const updatedTask: Task = {
      ...task,
      projectId: target.projectId,
      priority: target.priority,
    };

    if (source.projectId !== target.projectId) {
      updatedTask.sectionId = null;
    }

    this.store.dispatch(
      EisenhowerMatrixActions.moveTask({
        task: updatedTask,
      })
    );
  }
}
