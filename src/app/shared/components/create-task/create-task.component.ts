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
import { Priority, Section, Tag, Task } from '../../../models';
import { CreateTaskComponentActions } from '../../../store/actions';
import { selectCurrentProjectId } from '../../../store/reducers/projects.reducer';
import { selectTags } from '../../../store/selectors';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';

@Component({
  selector: 'yata-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CreateTaskComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  existingTags!: Set<Tag>;
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
      .subscribe((tags) => (this.existingTags = new Set<Tag>(tags)));
  }

  initForm() {
    this.form = this.fb.group({
      title: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.maxLength(Task.Title.MaxLength)],
      }),
      priority: this.fb.control(Priority.NONE, {
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

  handlePriorityChange(priority: Priority) {
    this.priorityControl.setValue(priority);
  }

  handleSelectedSection(section: Section) {
    this.form.patchValue({
      sectionId: section.id,
    });
    this.section = section;
  }

  /**
   * Determines the intersection of two sets based on `name` attribute
   * of the `Tag` entity.
   * @param selectedTags The set of the user's selected tags
   * @param existingTags The set of existing tags
   * @returns An array of tags
   */
  intersectOnTagName(selectedTags: Set<Tag>, existingTags: Set<Tag>) {
    const map = new Map<string, Tag>();
    for (let tag of selectedTags) {
      map.set(tag.name, tag);
    }

    for (let tag of existingTags) {
      const entry = map.get(tag.name);
      if (entry) {
        map.set(tag.name, tag);
      }
    }

    return Array.from(map.values());
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

    task.tags = this.intersectOnTagName(this.selectedTags, this.existingTags);
    this.store.dispatch(CreateTaskComponentActions.createTask({ task }));

    this.created.emit();
    this.form.reset();

    this.section = null;
    this.selectedTags.clear();
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
