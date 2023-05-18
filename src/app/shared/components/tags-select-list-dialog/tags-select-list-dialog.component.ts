import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormArray,
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
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { Tag, Task } from '../../../models';
import { TaskDetailsActions } from '../../../store/actions';
import { selectAvailableTagsForCurrentTask } from '../../../store/selectors';

@Component({
  selector: 'yata-tags-select-list-dialog',
  templateUrl: './tags-select-list-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatListModule,
    NgFor,
    MatButtonModule,
    AsyncPipe,
  ],
})
export class TagsSelectListDialogComponent implements OnInit {
  readonly tags$ = this.store.select(selectAvailableTagsForCurrentTask);
  form!: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<TagsSelectListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: [
        '',
        [Validators.minLength(1), Validators.maxLength(Tag.Name.MaxLength)],
      ],
      tags: this.fb.control([], [Validators.required]),
    });
  }

  trackByTagId(_index: number, tag: Tag) {
    return tag.id;
  }

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get tagsControl() {
    return this.form.get('tags') as FormArray;
  }

  handleCreateTag() {
    const name: string | null = this.nameControl.value;
    if (!name) return;
    if (name.trim().length === 0) return;

    const tag: Tag = { name };
    this.store.dispatch(
      TaskDetailsActions.createTag({
        tag,
      })
    );
  }

  handleSubmit() {
    if (this.form.invalid) return;
    const tags: number[] = this.form.value.tags;

    this.store.dispatch(
      TaskDetailsActions.updateTask({
        task: {
          id: this.data.id,
          tags: tags.map((value) => ({ id: value } as Tag)),
        },
      })
    );

    this.dialogRef.close(true);
  }
}
