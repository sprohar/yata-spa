import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
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
import { Section } from '../../../models';
import { EditSectionDialogActions } from '../../../store/actions';

@Component({
  selector: 'yata-edit-section-dialog',
  templateUrl: './edit-section-dialog.component.html',
  styleUrls: ['./edit-section-dialog.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class EditSectionDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Section
  ) {}

  ngOnInit(): void {
    if (!this.data) {
      throw new Error('Section is undefined');
    }
    this.initForm(this.data);
  }

  initForm(section: Section) {
    this.form = this.fb.group({
      id: [section.id, [Validators.required]],
      projectId: [section.projectId, [Validators.required]],
      name: [
        section.name,
        [Validators.required, Validators.maxLength(Section.Name.MaxLength)],
      ],
    });
  }

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  handleSave() {
    if (this.form.invalid || this.form.pristine) {
      return;
    }

    this.store.dispatch(
      EditSectionDialogActions.updateSection({
        section: {
          ...this.form.value,
        },
      })
    );

    this.dialogRef.close();
  }
}
