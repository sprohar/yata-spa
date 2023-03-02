import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Section, Task } from '../../../models';
import { CreateTaskActions } from '../../../store/actions';
import { selectCurrentProjectId } from '../../../store/reducers/projects.reducer';

@Component({
  selector: 'yata-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  @Input() section?: Section;
  currentProjectId$ = this.store.select(selectCurrentProjectId);
  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

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
    });
  }

  get titleControl() {
    return this.form.get('title') as FormControl;
  }

  get priorityControl() {
    return this.form.get('priority') as FormControl;
  }

  handlePriorityChange(priority: Task.Priority) {
    this.priorityControl.setValue(priority);
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
    this.form.reset();
  }
}
