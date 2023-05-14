import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Priority, Task } from '../../../../models';
import { TaskCardActions } from '../../../../store/actions';
import { TaskOptionsComponent } from '../../../../shared/components/task-options/task-options.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { NgIf, NgClass, DatePipe } from '@angular/common';

@Component({
    selector: 'yata-task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatCardModule, NgClass, MatCheckboxModule, TaskOptionsComponent, DatePipe]
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  form!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.task) {
      throw new Error('Method not implemented.');
    }
    this.initForm(this.task);
  }

  initForm(task: Task) {
    this.form = this.fb.group({
      id: [task.id, [Validators.required]],
      projectId: [task.projectId, [Validators.required]],
      isCompleted: [task.isCompleted, [Validators.required]],
    });
  }

  get borderColor() {
    return {
      'border-left-red': this.task.priority === Priority.HIGH,
      'border-left-yellow': this.task.priority === Priority.MEDIUM,
      'border-left-blue': this.task.priority === Priority.LOW,
    };
  }

  handleChecked() {
    this.store.dispatch(
      TaskCardActions.updateTask({
        task: this.form.value,
      })
    );

    this.changeDetector.detectChanges();
  }

  handleViewTask() {
    this.router.navigate(['tasks', this.task.id!], { relativeTo: this.route });
  }
}
