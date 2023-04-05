import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Priority, Task } from '../../../models';
import { ListViewActions } from '../../../store/actions';

@Component({
  selector: 'yata-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() task!: Task;
  @Input() isDraggable = true;
  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.task) {
      throw new Error(`"task" is undefined`);
    }
    this.initForm(this.task);
  }

  get priorityControl() {
    return this.form.get('priority') as FormControl;
  }

  initForm(task: Task) {
    this.form = this.fb.group({
      id: [task.id],
      projectId: [task.projectId],
      priority: [task.priority],
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
            isCompleted: true,
            projectId: task.projectId,
          },
        })
      );
    } else {
      this.store.dispatch(
        ListViewActions.markTaskAsIncomplete({
          task: {
            id: task.id,
            isCompleted: false,
            projectId: task.projectId,
          },
        })
      );
    }
  }

  handlePriorityChange(priority: Priority) {
    this.priorityControl.setValue(priority);
    this.priorityControl.markAsDirty();
    this.update();
  }
}
