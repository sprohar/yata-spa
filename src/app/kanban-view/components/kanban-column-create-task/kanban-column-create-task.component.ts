import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Priority, Section, Task } from '../../../models';
import { DateTimePickerDialogComponent } from '../../../shared/components/date-time-picker-dialog/date-time-picker-dialog.component';
import { KanbanViewActions } from '../../../store/actions';

@Component({
  selector: 'yata-kanban-column-create-task',
  templateUrl: './kanban-column-create-task.component.html',
  styleUrls: ['./kanban-column-create-task.component.scss'],
})
export class KanbanColumnCreateTaskComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  @Input() section!: Section;
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
    this.initForm(this.section);
  }

  get priorityControl() {
    return this.form.get('priority') as FormControl;
  }

  get dueDateControl() {
    return this.form.get('dueDate') as FormControl;
  }

  initForm(section: Section) {
    this.form = this.fb.group({
      dueDate: [null],
      title: this.fb.control('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(Task.Title.MaxLength),
        ],
      }),
      priority: this.fb.control(Priority.NONE, {
        nonNullable: true,
      }),
      sectionId: this.fb.control(section.id, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      projectId: this.fb.control(section.projectId, {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  handlePriorityChange(priority: Priority) {
    this.priorityControl.setValue(priority);
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

  handleSave() {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(
      KanbanViewActions.createTask({ task: this.form.value })
    );

    this.form.reset();
  }
}
