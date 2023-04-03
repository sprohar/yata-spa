import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Priority, Project, Task } from '../../../models';
import { DateTimePickerDialogComponent } from '../../../shared/components/date-time-picker-dialog/date-time-picker-dialog.component';
import { CreateTaskComponentActions } from '../../../store/actions';
import { selectProjects } from '../../../store/selectors';

@Component({
  selector: 'yata-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  form!: FormGroup;
  projects$ = this.store.select(selectProjects);

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Priority,
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      projectId: [null, [Validators.required]],
      priority: [this.data],
      dueDate: [],
      title: [
        '',
        [Validators.required, Validators.maxLength(Task.Title.MaxLength)],
      ],
      content: [null, [Validators.maxLength(Task.Content.MaxLength)]],
    });
  }

  get projectIdControl() {
    return this.form.get('projectId') as FormControl;
  }

  get dueDateControl() {
    return this.form.get('dueDate') as FormControl;
  }

  private getInbox(projects: Project[]): Project | undefined {
    return projects.find((p) => p.name.toUpperCase() === 'INBOX');
  }

  getSelectedProject(projects: Project[]) {
    if (this.projectIdControl.value) {
      return projects.find((p) => p.id === this.projectIdControl.value);
    }

    const inbox = this.getInbox(projects);
    if (inbox) {
      this.projectIdControl.setValue(inbox.id);
    }

    return inbox;
  }

  getAvailableProjects(projects: Project[]) {
    if (this.projectIdControl.value) {
      return projects.filter((p) => p.id !== this.projectIdControl.value);
    }

    return projects.filter((p) => p.name.toUpperCase() !== 'INBOX');
  }

  openDateTimePicker() {
    const ref = this.dialog.open(DateTimePickerDialogComponent);
    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.dueDateControl.setValue(result);
      });
  }

  setProjectId(projectId: number) {
    this.projectIdControl.setValue(projectId);
  }

  handleSave() {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(
      CreateTaskComponentActions.createTask({
        task: this.form.value,
      })
    );

    this.dialogRef.close();
  }
}
