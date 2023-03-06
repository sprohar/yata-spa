import {
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
import { Section, Task } from '../../../models';
import { CreateTaskActions } from '../../../store/actions';
import { selectCurrentProjectId } from '../../../store/reducers/projects.reducer';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';

@Component({
  selector: 'yata-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
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
      priority: this.fb.control(Task.Priority.NONE, {
        nonNullable: true,
      }),
      dueDate: [null],
      sectionId: [null],
    });
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
    if (this.form.invalid) {
      return;
    }

    const task: Task = {
      ...this.form.value,
      projectId,
    };

    if (this.section) {
      task.sectionId = this.section.id;
    }

    this.store.dispatch(CreateTaskActions.createTask({ task }));
    this.created.emit();
    this.form.reset();
    this.section = null;
  }

  removeDueDate() {
    this.dueDateControl.setValue(null);
  }

  removeSection() {
    this.section = null;
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
