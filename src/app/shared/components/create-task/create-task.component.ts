import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
export class CreateTaskComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly selectedTags = new Set<Tag>();
  existingTags!: Set<Tag>;

  @Output() canceled = new EventEmitter<void>();
  @Output() created = new EventEmitter<Task>();
  @Input() parent?: Task;
  @Input() project?: Project;
  @Input() section?: Section | null;
  @Input() priority? = Priority.NONE;
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
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.initForm(this.parent);
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
  }

  initForm(parent?: Task) {
    this.form = this.fb.group({
      title: this.fb.control('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(Task.Title.MaxLength),
        ],
      }),
      description: ['', [Validators.maxLength(Task.Description.MaxLength)]],
      priority: this.fb.control(this.priority ?? Priority.NONE, {
        nonNullable: true,
      }),
      projectId: [this.project?.id, [Validators.required]],
      sectionId: [this.section?.id ?? parent?.sectionId],
      parentId: [parent?.id],
      dueDate: [null],
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
        this.dueDateControl.setValue(result);
        this.changeDetectionRef.detectChanges();
      });
  }

  handleSave() {
    if (this.form.invalid) return;
    if ((this.titleControl.value as string).trim() === '') return;

    const task: Task = {
      ...this.form.value,
    };

    task.tags = this.intersectOnTagName(this.selectedTags, this.existingTags);
    if (this.form.get('parentId')?.value) {
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
