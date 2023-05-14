import { TextFieldModule } from '@angular/cdk/text-field';
import {
  AsyncPipe,
  DatePipe,
  KeyValuePipe,
  NgClass,
  NgFor,
  NgIf,
} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { UserPreference } from '../../../auth/models/user.model';
import { Priority, Project, Section, Tag, Task } from '../../../models';
import { CreateTaskComponentActions } from '../../../store/actions';
import {
  selectCurrentProjectId,
  selectSectionsGroupedByProject,
  selectTags,
  selectUserPreferences,
} from '../../../store/selectors';
import { TaskPriorityPipe } from '../../pipes/task-priority.pipe';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';

@Component({
  selector: 'yata-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    NgFor,
    MatIconModule,
    TextFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatMenuModule,
    NgClass,
    MatDividerModule,
    AsyncPipe,
    DatePipe,
    KeyValuePipe,
    TaskPriorityPipe,
  ],
})
export class CreateTaskComponent implements AfterViewInit, OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly selectedTags = new Set<Tag>();

  preferences: UserPreference | null = null;
  existingTags!: Set<Tag>;
  form!: FormGroup;

  @Output() canceled = new EventEmitter<void>();
  @Output() created = new EventEmitter<Task>();
  @Input() parent?: Task;
  @Input() project?: Project;
  @Input() section?: Section | null;
  @Input() priority? = Priority.NONE;
  @ViewChild('taskInput') taskInput!: ElementRef;

  readonly HIGH_PRIORITY = Priority.HIGH;
  readonly MEDIUM_PRIORITY = Priority.MEDIUM;
  readonly LOW_PRIORITY = Priority.LOW;
  readonly NO_PRIORITY = Priority.NONE;
  readonly group$ = this.store.select(selectSectionsGroupedByProject);

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (this.taskInput) {
      this.taskInput.nativeElement.focus();
    }
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.initForm();

    this.store
      .select(selectUserPreferences)
      .pipe(takeUntil(this.destroy$))
      .subscribe((prefs) => (this.preferences = prefs));

    this.store
      .select(selectTags)
      .pipe(takeUntil(this.destroy$))
      .subscribe((tags) => (this.existingTags = new Set<Tag>(tags)));

    this.store
      .select(selectCurrentProjectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((projectId) => {
        if (projectId) this.projectIdControl.setValue(projectId);
      });

    if (this.project) this.projectIdControl.setValue(this.project.id);
    if (this.section) this.sectionIdControl.setValue(this.section.id);
    if (this.parent) this.parentIdControl.setValue(this.parent.id);
  }

  initForm() {
    this.form = this.fb.group({
      title: this.fb.control('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(Task.Title.MaxLength),
        ],
      }),
      priority: this.fb.control(this.priority, {
        nonNullable: true,
      }),
      description: [null, [Validators.maxLength(Task.Description.MaxLength)]],
      projectId: [null, [Validators.required]],
      sectionId: [null],
      parentId: [null],
      dueDate: this.fb.control(
        this.preferences && this.preferences.defaultDueDateToday !== undefined
          ? this.preferences.defaultDueDateToday
          : new Date(new Date().setHours(0, 0, 0, 0))
      ),
    });

    this.titleControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.handleParseInputForTags.bind(this));
  }

  get projectIdControl() {
    return this.form.get('projectId') as FormControl;
  }

  get sectionIdControl() {
    return this.form.get('sectionId') as FormControl;
  }

  get titleControl() {
    return this.form.get('title') as FormControl;
  }

  get priorityControl() {
    return this.form.get('priority') as FormControl;
  }

  get dueDateControl() {
    return this.form.get('dueDate') as FormControl<Date | null>;
  }

  get parentIdControl() {
    return this.form.get('parentId') as FormControl;
  }

  trackBySectionId(_index: number, section: Section) {
    return section.id;
  }

  getProjectSections(projectId: number, group: Map<Project, Section[]>) {
    for (const [project, sections] of group) {
      if (project.id === projectId) return sections;
    }
    return [];
  }

  getPriorityCssClass() {
    switch (this.priorityControl.value) {
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
    this.titleControl.setValue(value.substring(0, start));
  }

  handlePriorityChange(priority: Priority) {
    this.priorityControl.setValue(priority);
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
    for (const tag of selectedTags) {
      map.set(tag.name, tag);
    }

    for (const tag of existingTags) {
      const entry = map.get(tag.name);
      if (entry) {
        map.set(tag.name, tag);
      }
    }

    return Array.from(map.values());
  }

  handleCancel() {
    this.canceled.emit();
  }

  removeDueDate() {
    this.dueDateControl.setValue(null);
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
        if (typeof result === 'string') return; // Cancelled
        this.dueDateControl.setValue(result);
        this.changeDetector.detectChanges();
      });
  }

  handleSubmit() {
    if (this.form.invalid) return;
    if ((this.titleControl.value as string).trim() === '') return;

    const task: Task = this.form.value;
    const dueDate = this.dueDateControl.value as Date;
    task.dueDate = dueDate.toISOString();
    task.tags = this.intersectOnTagName(this.selectedTags, this.existingTags);

    Object.keys(task).forEach((key) => {
      if (task[key as keyof Task] === null) delete task[key as keyof Task];
    });

    if (task.tags.length === 0) delete task.tags;

    if (this.parentIdControl.value) {
      this.store.dispatch(
        CreateTaskComponentActions.createSubtask({
          subtask: task,
        })
      );
    } else {
      this.store.dispatch(CreateTaskComponentActions.createTask({ task }));
    }

    this.created.emit();
  }
}
