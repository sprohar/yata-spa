import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Priority, Project, Task } from '../../../models';
import { CreateTaskDialogComponent } from '../../../shared/components/create-task-dialog/create-task-dialog.component';
import { EisenhowerMatrixActions } from '../../../store/actions';
import { selectProjects } from '../../../store/selectors';
import { MatrixListData } from '../../interfaces/matrix-list-data';

@Component({
  selector: 'yata-matrix-quadrant',
  templateUrl: './matrix-quadrant.component.html',
  styleUrls: ['./matrix-quadrant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixQuadrantComponent implements OnInit {
  @Input() tasks!: Task[];
  @Input() priority!: Priority;
  completedTasks?: Task[];
  projects$ = this.store.select(selectProjects);
  showCompleted = true;

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    if (this.tasks) {
      this.completedTasks = this.tasks.filter((t) => t.isCompleted);
    }
  }

  get headerText() {
    switch (this.priority) {
      case Priority.HIGH:
        return 'Urgent & Important';
      case Priority.MEDIUM:
        return 'Not Urgent & Important';
      case Priority.LOW:
        return 'Urgent & Unimportant';
      case Priority.NONE:
        return 'Not Urgent & Unimportant';
      default:
        return '';
    }
  }

  get textColorClassName() {
    return {
      'high-priority': this.priority === Priority.HIGH,
      'medium-priority': this.priority === Priority.MEDIUM,
      'low-priority': this.priority === Priority.LOW,
      'no-priority': this.priority === Priority.NONE,
    };
  }

  getProjectTasks(project: Project) {
    return this.tasks.filter((t) => t.projectId === project.id);
  }

  openCreateTaskDialog() {
    this.dialog.open(CreateTaskDialogComponent, {
      data: {
        priority: this.priority,
      },
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
