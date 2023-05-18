import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
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
import { Tag } from '../../../../models';
import { SidenavActions } from '../../../../store/actions';

@Component({
  selector: 'yata-edit-tag-dialog',
  templateUrl: './edit-tag-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
  ],
})
export class EditTagDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditTagDialogComponent>,
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
