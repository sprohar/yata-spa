import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Project } from '../../models';
import { SidenavActions } from '../../store/actions';

@Component({
  selector: 'yata-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectDialogComponent implements OnInit {
  readonly nameMaxLength = Project.Name.MaxLength;
  readonly LIST_VIEW = Project.View.LIST;
  readonly KANBAN_VIEW = Project.View.KANBAN;
  form!: FormGroup;

  @ViewChild('input', { static: true })
  inputElement?: ElementRef;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(Project.Name.MaxLength)],
      ],
      view: [Project.View.LIST, []],
    });

    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }

  handleSave() {
    if (this.form.invalid) {
      return;
    }

    const project: Project = this.form.value;
    this.store.dispatch(SidenavActions.createProject({ project }));
    this.dialogRef.close();
  }
}
