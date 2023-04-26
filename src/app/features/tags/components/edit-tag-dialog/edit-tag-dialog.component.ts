import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Tag } from '../../../../models';
import { SidenavActions } from '../../../../store/actions';

@Component({
  selector: 'yata-edit-tag-dialog',
  templateUrl: './edit-tag-dialog.component.html',
  styleUrls: ['./edit-tag-dialog.component.scss'],
})
export class EditTagDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Tag
  ) {}

  ngOnInit(): void {
    if (!this.data)
      throw new Error('EditTagDialogComponent requires data to be passed in');

    this.initForm(this.data);
  }

  private initForm(tag: Tag) {
    this.form = this.fb.group({
      id: [tag.id, [Validators.required]],
      name: [
        tag.name,
        [Validators.required, Validators.maxLength(Tag.Name.MaxLength)],
      ],
      colorHexCode: [
        tag.colorHexCode,
        [Validators.maxLength(Tag.ColorHexCode.MaxLength)],
      ],
    });
  }

  get colorHexCodeControl() {
    return this.form.get('colorHexCode') as FormControl;
  }

  clearColorInput() {
    this.colorHexCodeControl.setValue(null);
    this.form.markAsDirty();
  }

  handleSave() {
    if (this.form.invalid || this.form.pristine) return;

    this.store.dispatch(
      SidenavActions.editTag({
        tag: this.form.value,
      })
    );

    this.dialogRef.close();
  }
}