import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Section } from '../../../models';
import { EditSectionDialogActions } from '../../../store/actions';

@Component({
  selector: 'yata-edit-section-dialog',
  templateUrl: './edit-section-dialog.component.html',
  styleUrls: ['./edit-section-dialog.component.scss'],
})
export class EditSectionDialogComponent implements OnDestroy, OnInit {
  form!: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Section
  ) {}

  ngOnDestroy(): void {
    this.store.dispatch(EditSectionDialogActions.onDestroy());
  }

  ngOnInit(): void {
    if (!this.data) {
      throw new Error('Section is undefined');
    }
    this.initForm(this.data);
    this.store.dispatch(
      EditSectionDialogActions.onInit({
        section: this.data,
      })
    );
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
