import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Project } from '../../models';
import { SidenavActions } from '../../store/actions';

@Component({
  selector: 'yata-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    TitleCasePipe,
  ],
})
export class CreateProjectDialogComponent implements OnInit {
  readonly nameMaxLength = Project.Name.MaxLength;
  readonly LIST_VIEW = Project.View.LIST;
  readonly KANBAN_VIEW = Project.View.KANBAN;
  form!: FormGroup;

  @ViewChild('input', { static: true })
  inputElement?: ElementRef;

  constructor(
    private readonly store: Store,
    private readonly dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private readonly fb: FormBuilder
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
