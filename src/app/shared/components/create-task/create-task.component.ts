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
import { Observable, Subject, takeUntil } from 'rxjs';
import { Priority, Project, Section, Tag, Task } from '../../../models';
import {
  selectSectionsGroupedByProject,
  selectTags,
} from '../../../store/selectors';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';

@Component({
  selector: 'yata-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CreateTaskComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly selectedTags = new Set<Tag>();
  existingTags!: Set<Tag>;

  @Output() canceled = new EventEmitter<void>();
  @Output() created = new EventEmitter<Task>();
  @Input() project?: Project;
  @Input() section?: Section | null;
  form!: FormGroup;

  readonly HIGH_PRIORITY = Priority.HIGH;
  readonly MEDIUM_PRIORITY = Priority.MEDIUM;
  readonly LOW_PRIORITY = Priority.LOW;
  readonly NO_PRIORITY = Priority.NONE;

  group$: Observable<Map<Project, Section[]>> = this.store.select(
    selectSectionsGroupedByProject
  );

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
      description: ['', [Validators.maxLength(Task.Description.MaxLength)]],
      priority: this.fb.control(Priority.NONE, {
        nonNullable: true,
      }),
      dueDate: [null],
      projectId: [null, [Validators.required]],
      sectionId: [null],
    });

    this.title.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.handleParseInputForTags.bind(this));
  }

  get projectId() {
    return this.form.get('projectId') as FormControl;
  }

  get sectionId() {
    return this.form.get('sectionId') as FormControl;
  }

  get title() {
    return this.form.get('title') as FormControl;
  }

  get priority() {
    return this.form.get('priority') as FormControl;
  }

  get dueDate() {
    return this.form.get('dueDate') as FormControl;
  }

  getProjectSections(projectId: number, group: Map<Project, Section[]>) {
    for (const [project, sections] of group) {
      if (project.id === projectId) return sections;
    }
    return [];
  }

  getPriorityCssClass() {
    switch (this.priority.value) {
      case Priority.LOW:
        return 'low-priority';
      case Priority.MEDIUM:
        return 'medium-priority';
      case Priority.HIGH:
        return 'high-priority';
      default:
        return '';
    }
  }

  handleParseInputForTags(value: string) {
    const start = value.indexOf('#');
    if (start === -1) return;
    if (start === value.length) return;

    const end = value.indexOf(' ', start);
    if (end === -1) return;

    const tagName = value.substring(start + 1, end);
    this.selectedTags.add({ name: tagName });
    this.title.setValue(value.substring(0, start));
  }

  handlePriorityChange(priority: Priority) {
    this.priority.setValue(priority);
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

  handleSave() {
    if (this.form.invalid) return;
    if (!this.title.value) return;
    if ((this.title.value as string).trim() === '') return;

    // const task: Task = {
    //   ...this.form.value,
    //   projectId,
    // };
    //
    // if (this.section) {
    //   task.sectionId = this.section.id;
    // }
    //
    // task.tags = this.intersectOnTagName(this.selectedTags, this.existingTags);
    // this.store.dispatch(CreateTaskComponentActions.createTask({ task }));
    //
    // this.created.emit();
    // this.form.reset();
    //
    // this.section = null;
    // this.selectedTags.clear();
  }

  handleCancel() {
    this.canceled.emit();
  }

  removeDueDate() {
    this.dueDate.setValue(null);
  }

  removeTag(tag: Tag) {
    this.selectedTags.delete(tag);
  }

  openDateTimePicker() {
    const ref = this.dialog.open(DateTimePickerDialogComponent, {
      data: this.dueDate.value,
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.dueDate.setValue(result);
      });
  }
}
