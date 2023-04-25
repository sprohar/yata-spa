import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Tag } from '../../../../models';
import { SidenavActions } from '../../../../store/actions';

@Component({
  selector: 'yata-create-tag-dialog',
  templateUrl: './create-tag-dialog.component.html',
  styleUrls: ['./create-tag-dialog.component.scss'],
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
