import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Priority, Project, Section, Task } from '../../../models';
import { CreateTaskComponent } from '../create-task/create-task.component';

export interface CreateTaskDialogData {
  section: Section | null;
  project: Project | null;
  priority: Priority | null;
  parent: Task | null;
}

@Component({
  selector: 'yata-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatDialogModule, CreateTaskComponent],
})
export class CreateTaskDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: CreateTaskDialogData,
    private readonly dialogRef: MatDialogRef<CreateTaskDialogComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
