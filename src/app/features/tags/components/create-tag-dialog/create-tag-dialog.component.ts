import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Tag } from '../../../../models';
import { SidenavActions } from '../../../../store/actions';

@Component({
  selector: 'yata-create-tag-dialog',
  templateUrl: './create-tag-dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class CreateTagDialogComponent implements AfterViewInit, OnInit {
  form!: FormGroup;

  @ViewChild('tagInput')
  tagInput!: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<CreateTagDialogComponent>,
    private store: Store,
    private fb: FormBuilder,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.tagInput.nativeElement.focus();
    this.changeDetector.detectChanges();
  }

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
