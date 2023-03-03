import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from '../../../models';
import { TaskDetailsActions } from '../../../store/actions/task-details.actions';

@Component({
  selector: 'yata-create-subtask',
  templateUrl: './create-subtask.component.html',
  styleUrls: ['./create-subtask.component.scss'],
})
export class CreateSubtaskComponent implements OnInit {
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Input() task!: Task;
  readonly titleMaxLength = Task.Title.MaxLength;
  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.task) {
      throw new Error('"task" is undefined');
    }
    this.initForm(this.task);
  }

  initForm(task: Task) {
    this.form = this.fb.group({
      taskId: this.fb.control(task.id, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      completed: this.fb.control(false, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      priority: this.fb.control(Task.Priority.NONE, { nonNullable: true }),
      title: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.maxLength(Task.Title.MaxLength),
        ],
        nonNullable: true,
      }),
    });
  }

  get priorityControl() {
    return this.form.get('priority') as FormControl;
  }

  handlePriorityChange(priority: Task.Priority) {
    this.priorityControl.setValue(priority);
  }

  handleCancel() {
    this.cancel.emit();
  }

  handleSave() {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(
      TaskDetailsActions.createSubtask({
        subtask: this.form.value,
      })
    );

    this.save.emit();
    this.form.reset();
  }
}
