import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { Task } from '../../../models';
import { TaskActions } from '../../../store/actions';

@Component({
  selector: 'yata-task-informative',
  templateUrl: './task-informative.component.html',
  styleUrls: ['./task-informative.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskInformativeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  @Input() task!: Task;
  @Input() isDraggable = true;
  form!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    if (!this.task) {
      throw new Error(`"task" is undefined`);
    }

    this.initForm(this.task);

    this.isCompletedControl.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((_checked) => {
        this.handleChecked();
      });
  }

  get isCompletedControl() {
    return this.form.get('isCompleted') as FormControl;
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

  handleViewTask() {
    this.router.navigate(['tasks', this.task.id!], { relativeTo: this.route });
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
