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
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Tag, Task } from '../../../models';
import { TaskDetailsActions } from '../../../store/actions';
import { selectAvailableTagsForCurrentTask } from '../../../store/selectors';

@Component({
  selector: 'yata-tags-select-list-dialog',
  templateUrl: './tags-select-list-dialog.component.html',
  styleUrls: ['./tags-select-list-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsSelectListDialogComponent implements OnInit {
  form!: FormGroup;
  tags$ = this.store.select(selectAvailableTagsForCurrentTask);

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TagsSelectListDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Task
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: [
        null,
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
    const name = this.nameControl.value as string;
    if (name.trim().length === 0) return;

    const tag: Tag = { name };
    this.store.dispatch(
      TaskDetailsActions.createTag({
        tag,
      })
    );
  }

  handleSave() {
    if (this.form.invalid) return;
    const tags: number[] = this.form.value.tags;

    this.store.dispatch(
      TaskDetailsActions.updateTask({
        task: {
          id: this.data.id,
          tags: tags.map((value) => ({ id: value, name: '' })),
        },
      })
    );

    this.dialogRef.close(true);
  }
}
