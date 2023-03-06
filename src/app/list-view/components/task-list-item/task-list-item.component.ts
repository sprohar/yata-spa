import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from '../../../models';
import { ListViewActions } from '../../../store/actions';

@Component({
  selector: 'yata-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss'],
})
export class TaskListItemComponent implements OnInit {
  @Input() task!: Task;
  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.task) {
      throw new Error(`"task" is undefined`);
    }
    this.initForm(this.task);
  }

  initForm(task: Task) {
    this.form = this.fb.group({
      id: [task.id],
      projectId: [task.projectId],
      title: [
        task.title,
        [Validators.required, Validators.maxLength(Task.Title.MaxLength)],
      ],
    });
  }

  update() {
    if (this.form.invalid || this.form.pristine) {
      return;
    }

    this.store.dispatch(
      ListViewActions.updateTaskListItem({
        task: this.form.value,
      })
    );
  }

  handleChecked(checked: boolean, task: Task) {
    if (checked) {
      this.store.dispatch(
        ListViewActions.markTaskAsComplete({
          task: {
            id: task.id,
            completed: true,
            projectId: task.projectId,
          },
        })
      );
    } else {
      this.store.dispatch(
        ListViewActions.markTaskAsIncomplete({
          task: {
            id: task.id,
            completed: false,
            projectId: task.projectId,
          },
        })
      );
    }
  }
}
