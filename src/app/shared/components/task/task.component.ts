import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { TaskView } from '../../../interfaces';
import { Task } from '../../../models';
import { TaskActions } from '../../../store/actions/task.actions';
import { selectUserPreferences } from '../../../store/selectors';

@Component({
  selector: 'yata-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  readonly TASK_VIEW_INFORMATIVE = TaskView.INFORMATIVE;
  readonly prefs$ = this.store.select(selectUserPreferences);
  @Input() task!: Task;
  @Input() isDraggable = false;
  form!: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router
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
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.handleChecked());
  }

  get idControl() {
    return this.form.get('id') as FormControl;
  }

  get isCompletedControl() {
    return this.form.get('isCompleted') as FormControl<boolean>;
  }

  initForm(task: Task) {
    this.form = this.fb.group({
      id: [task.id],
      isCompleted: [task.isCompleted ?? false],
      title: [
        task.title,
        [Validators.required, Validators.maxLength(Task.Title.MaxLength)],
      ],
    });
  }

  handleChecked() {
    this.store.dispatch(
      TaskActions.updateTask({
        task: {
          id: this.idControl.value,
          isCompleted: this.isCompletedControl.value,
        },
      })
    );
  }

  handleViewTask(task: Task) {
    this.router.navigate(['tasks', task.id], {
      relativeTo: this.route,
    });
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
