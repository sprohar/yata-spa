import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from '../../../models';
import { TaskActions } from '../../../store/actions';

@Component({
  selector: 'yata-task-informative',
  templateUrl: './task-informative.component.html',
  styleUrls: ['./task-informative.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskInformativeComponent {
  @Input() task!: Task;
  @Input() isDraggable = true;
  form!: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!this.task) {
      throw new Error(`"task" is undefined`);
    }

    this.initForm(this.task);

    // this.form
    //   .get('isCompleted')
    //   ?.valueChanges.pipe(takeUntil(this.destroy$))
    //   .subscribe((_checked) => {
    //     this.handleChecked();
    //   });
  }

  initForm(task: Task) {
    this.form = this.fb.group({
      id: [task.id],
      isCompleted: [task.isCompleted],
      title: [
        task.title,
        [Validators.required, Validators.maxLength(Task.Title.MaxLength)],
      ],
    });
  }

  handleChecked() {
    const task = this.form.value;
    this.store.dispatch(
      TaskActions.updateTask({
        task: {
          id: task.id,
          isCompleted: task.isCompleted,
        },
      })
    );
  }

  handleSubmit() {
    if (this.form.invalid || this.form.pristine) {
      return;
    }

    this.store.dispatch(
      TaskActions.updateTask({
        task: this.form.value,
      })
    );
  }
}
