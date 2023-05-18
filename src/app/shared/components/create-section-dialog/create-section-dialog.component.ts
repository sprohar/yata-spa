import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
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
import { Project, Section } from '../../../models';
import { ViewHeaderActions } from '../../../store/actions';

@Component({
  selector: 'yata-create-section-dialog',
  templateUrl: './create-section-dialog.component.html',
  styleUrls: ['./create-section-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class CreateSectionDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<CreateSectionDialogComponent>,
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
