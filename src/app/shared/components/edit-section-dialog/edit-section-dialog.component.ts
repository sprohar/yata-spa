import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Section } from '../../../models';
import { KanbanViewActions } from '../../../store/actions';
import { selectCurrentSection } from '../../../store/selectors/sections.selectors';

@Component({
  selector: 'yata-edit-section-dialog',
  templateUrl: './edit-section-dialog.component.html',
  styleUrls: ['./edit-section-dialog.component.scss'],
})
export class EditSectionDialogComponent implements OnDestroy, OnInit {
  form!: FormGroup;
  currentSection$?: Observable<Section | undefined>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditSectionDialogComponent>
  ) {}

  ngOnDestroy(): void {
    this.store.dispatch(KanbanViewActions.closeEditSectionDialog());
  }

  ngOnInit(): void {
    this.currentSection$ = this.store.select(selectCurrentSection).pipe(
      tap((section) => {
        if (!section) {
          throw new Error('Section is undefined');
        }
        this.initForm(section);
      })
    );
  }

  initForm(section: Section) {
    this.form = this.fb.group({
      name: [
        section.name,
        [Validators.required, Validators.maxLength(Section.Name.MaxLength)],
      ],
    });
  }

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  handleSave(section: Section) {
    if (this.form.invalid || this.form.pristine) {
      return;
    }

    this.store.dispatch(
      KanbanViewActions.updateSection({
        section: {
          ...section,
          ...this.form.value,
        },
      })
    );

    this.dialogRef.close();
  }
}
