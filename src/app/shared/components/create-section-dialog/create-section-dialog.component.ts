import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Project, Section } from '../../../models';
import { ViewHeaderActions } from '../../../store/actions';

@Component({
  selector: 'yata-create-section-dialog',
  templateUrl: './create-section-dialog.component.html',
  styleUrls: ['./create-section-dialog.component.scss'],
})
export class CreateSectionDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {}

  ngOnInit(): void {
    if (!this.data) {
      throw new Error(
        'An instance of a Project must be given to create a new Section'
      );
    }

    this.form = this.fb.group({
      projectId: [this.data.id, [Validators.required]],
      name: [
        '',
        [Validators.required, Validators.maxLength(Section.Name.MaxLength)],
      ],
    });
  }

  handleCreateSection() {
    if (this.form.invalid) {
      return;
    }

    const section = this.form.value as Section;
    this.store.dispatch(
      ViewHeaderActions.createSection({
        section,
      })
    );

    this.dialogRef.close();
  }
}
