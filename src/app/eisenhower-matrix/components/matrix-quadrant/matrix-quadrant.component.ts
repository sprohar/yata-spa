import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Project, Task } from '../../../models';
import { selectProjects } from '../../../store/selectors';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'yata-matrix-quadrant',
  templateUrl: './matrix-quadrant.component.html',
  styleUrls: ['./matrix-quadrant.component.scss'],
})
export class MatrixQuadrantComponent implements OnInit {
  projects$ = this.store.select(selectProjects);
  @Input() tasks!: Task[];
  @Input() priority!: Task.Priority;
  showCompleted = true;

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {}

  get completedItems() {
    return this.tasks.filter(t => t.completed);
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
    return this.tasks.filter(t => t.projectId === project.id);
  }

  openCreateTaskDialog() {
    this.dialog.open(CreateTaskDialogComponent, {
      data: this.priority,
      minWidth: '350px',
    });
  }
}
