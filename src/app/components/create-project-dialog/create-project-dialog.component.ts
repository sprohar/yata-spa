import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Project } from '../../models';
import { SidenavActions } from '../../store/actions';

@Component({
  selector: 'yata-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent implements OnInit {

    readonly nameMaxLength = Project.Name.MaxLength;
  form!: FormGroup;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('', [
        Validators.required,
        Validators.maxLength(Project.Name.MaxLength),
      ]),
    });
  }

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  handleSave() {
    if (this.nameControl.invalid) {
      return;
    }

    const project: Project = {
      name: this.nameControl.value!.trim(),
    };
    this.store.dispatch(SidenavActions.createProject({ project }));
    this.dialogRef.close();
  }

}
