import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SidenavActions } from '../../../store/actions';
import { Tag } from '../../../models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'yata-create-tag-dialog',
  templateUrl: './create-tag-dialog.component.html',
  styleUrls: ['./create-tag-dialog.component.scss'],
})
export class CreateTagDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateTagDialogComponent>,
    private store: Store,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(Tag.Name.MaxLength)],
      ],
      colorHexCode: [null, [Validators.maxLength(Tag.ColorHexCode.MaxLength)]],
    });
  }

  handleCreate() {
    if (this.form.invalid) {
      return;
    }

    const tag: Tag = this.form.value;
    this.store.dispatch(
      SidenavActions.createTag({
        tag,
      })
    );

    this.dialogRef.close();
  }
}
