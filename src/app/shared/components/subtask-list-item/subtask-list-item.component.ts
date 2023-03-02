import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subtask, Task } from '../../../models';
import { SubtasksListItemActions } from '../../../store/actions/subtasks-list-item.actions';

@Component({
  selector: 'yata-subtask-list-item',
  templateUrl: './subtask-list-item.component.html',
  styleUrls: ['./subtask-list-item.component.scss'],
})
export class SubtaskListItemComponent implements OnInit {
  @Input() subtask!: Subtask;
  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.subtask) {
      throw new Error('Subtask is undefined');
    }

    this.initForm(this.subtask);
  }

  initForm(subtask: Subtask) {
    this.form = this.fb.group({
      id: [subtask.id, [Validators.required]],
      taskId: [subtask.taskId, [Validators.required]],
      completed: [subtask.completed ?? false, [Validators.required]],
      title: [
        subtask.title,
        [Validators.required, Validators.maxLength(Task.Title.MaxLength)],
      ],
    });
  }

  handleDelete() {
    this.store.dispatch(
      SubtasksListItemActions.deleteSubtask({
        subtask: this.subtask,
      })
    );
  }

  handleToggleCompletionStatus() {
    if (this.form.invalid) {
      return;
    }
    const subtask: Subtask = this.form.value;

    this.store.dispatch(
      SubtasksListItemActions.updateSubtask({
        subtask: {
          id: subtask.id!,
          completed: subtask.completed,
          taskId: subtask.taskId,
        },
      })
    );
  }

  handleSave() {
    if (this.form.invalid || this.form.pristine) {
      return;
    }

    this.store.dispatch(
      SubtasksListItemActions.updateSubtask({
        subtask: this.form.value,
      })
    );
  }
}
