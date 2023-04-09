import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Priority, Project, Section } from '../../../models';

export interface CreateTaskDialogData {
  section?: Section;
  project?: Project;
  priority?: Priority;
}

@Component({
  selector: 'yata-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: CreateTaskDialogData,
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
