import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Project } from '../../../models';
import { EditProjectDialogActions } from '../../../store/actions';

@Component({
  selector: 'yata-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class EditProjectDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private readonly dialogRef: MatDialogRef<EditProjectDialogComponent>,
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!this.data) {
      throw new Error('"data" is undefined');
    }

    this.initForm(this.data);
  }

  initForm(project: Project) {
    this.form = this.fb.group({
      id: [project.id],
      name: [
        project.name,
        [Validators.required, Validators.maxLength(Project.Name.MaxLength)],
      ],
    });
  }

  handleSave() {
    const project: Project = this.form.value;

    this.store.dispatch(
      EditProjectDialogActions.updateProject({
        project,
      })
    );

    this.dialogRef.close();
  }
}
