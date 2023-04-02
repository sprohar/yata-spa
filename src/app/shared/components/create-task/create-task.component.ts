import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { CreateTaskComponentActions } from 'src/app/store/actions';
import { selectTags } from 'src/app/store/selectors';
import { Section, Tag, Task } from '../../../models';
import { selectCurrentProjectId } from '../../../store/reducers/projects.reducer';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';

@Component({
  selector: 'yata-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  existingTags!: Tag[];
  readonly selectedTags = new Set<Tag>();

  @Output() created = new EventEmitter<void>();
  @Input() section?: Section | null;
  currentProjectId$ = this.store.select(selectCurrentProjectId);
  form!: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.initForm();
    this.store
      .select(selectTags)
      .pipe(takeUntil(this.destroy$))
      .subscribe((tags) => (this.existingTags = tags));
  }

  initForm() {
    this.form = this.fb.group({
      title: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.maxLength(Task.Title.MaxLength)],
      }),
      priority: this.fb.control(Task.Priority.NONE, {
        nonNullable: true,
      }),
      dueDate: [null],
      sectionId: [null],
    });

    this.titleControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.handleParseInputForTags.bind(this));
  }

  get titleControl() {
    return this.form.get('title') as FormControl;
  }

  get priorityControl() {
    return this.form.get('priority') as FormControl;
  }

  get dueDateControl() {
    return this.form.get('dueDate') as FormControl;
  }

  handleParseInputForTags(value: string) {
    const start = value.indexOf('#');
    if (start === -1) return;
    if (start === value.length) return;

    const end = value.indexOf(' ', start);
    if (end === -1) return;

    const tagName = value.substring(start + 1, end);
    this.selectedTags.add({ name: tagName });
    this.titleControl.setValue(value.substring(0, start));
  }

  handlePriorityChange(priority: Task.Priority) {
    this.priorityControl.setValue(priority);
  }

  handleSelectedSection(section: Section) {
    this.form.patchValue({
      sectionId: section.id,
    });
    this.section = section;
  }

  handleSave(projectId: number) {
    if (this.form.invalid) return;
    if (!this.titleControl.value) return;
    if ((this.titleControl.value as string).trim() === '') return;

    const task: Task = {
      ...this.form.value,
      projectId,
    };

    if (this.section) {
      task.sectionId = this.section.id;
    }

    task.tags = this.leftJoinOnTagName(
      Array.from(this.selectedTags),
      this.existingTags
    );

    this.store.dispatch(CreateTaskComponentActions.createTask({ task }));
    this.created.emit();
    this.form.reset();
    this.section = null;
    this.selectedTags.clear();
  }

  /**
   * Uses a left join to combine the tags that were selected by the user
   *  and the tags that already exist in the database.
   * If a tag that was selected by the user already exists in the database,
   * the tag that already exists in the database is used.
   * If a tag that was selected by the user does not exist in the database,
   * the tag that was selected by the user is used.
   * This is done to prevent duplicate tags from being created.
   * @example
   * const selectedTags = [{ name: 'tag1' }, { name: 'tag3' }];
   * const existingTags = [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }];
   * const tags = leftJoinOnTagName(selectedTags, existingTags);
   * // tags = [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }, { name: 'tag3' }]
   * @param selectedTags The tags that were selected by the user
   * @param existingTags The tags that already exist in the database
   * @returns An array of tags that contains the tags that already exist in the database
   * and the tags that were selected by the user
   */
  leftJoinOnTagName(selectedTags: Tag[], existingTags: Tag[]): Tag[] {
    const tags: Tag[] = [];
    let pushed = false;

    for (const selectedTag of selectedTags) {
      for (const existingTag of existingTags) {
        if (selectedTag.name.toUpperCase() === existingTag.name.toUpperCase()) {
          tags.push(existingTag);
          pushed = true;
          break;
        }
      }

      if (!pushed) tags.push(selectedTag);
      pushed = false;
    }

    return tags;
  }

  removeDueDate() {
    this.dueDateControl.setValue(null);
  }

  removeSection() {
    this.section = null;
  }

  removeTag(tag: Tag) {
    this.selectedTags.delete(tag);
  }

  openDateTimePicker() {
    const ref = this.dialog.open(DateTimePickerDialogComponent, {
      data: this.dueDateControl.value,
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.dueDateControl.setValue(result);
      });
  }
}
