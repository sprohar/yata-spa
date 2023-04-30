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
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserPreference } from '../../../auth/models/user.model';
import { PreferencesService } from '../../../features/preferences/services/preferences.service';
import { Priority, Project, Section, Tag, Task } from '../../../models';
import { CreateTaskComponentActions } from '../../../store/actions';
import {
  selectCurrentProjectId,
  selectSectionsGroupedByProject,
  selectTags,
} from '../../../store/selectors';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';

@Component({
  selector: 'yata-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent implements AfterViewInit, OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly selectedTags = new Set<Tag>();
  existingTags!: Set<Tag>;

  @Output() canceled = new EventEmitter<void>();
  @Output() created = new EventEmitter<Task>();
  @Input() parent?: Task;
  @Input() project?: Project;
  @Input() section?: Section | null;
  @Input() priority? = Priority.NONE;
  @ViewChild('taskInput')
  taskInput!: ElementRef;

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
    private dialog: MatDialog,
    private preferences: PreferencesService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.taskInput.nativeElement.focus();
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.initForm();

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
    const userPrefs: UserPreference | null = this.preferences.get();

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
      dueDate: [userPrefs?.defaultDueDateToday ? new Date() : null],
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
    return this.form.get('dueDate') as FormControl;
  }

  get parentIdControl() {
    return this.form.get('parentId') as FormControl;
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
