import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Section } from '../../../models';
import { KanbanViewActions } from '../../../store/actions';
import { selectCurrentProjectId } from '../../../store/reducers/projects.reducer';

@Component({
  selector: 'yata-create-kanban-column',
  templateUrl: './create-kanban-column.component.html',
  styleUrls: ['./create-kanban-column.component.scss'],
})
export class CreateKanbanColumnComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  currentProjectId$ = this.store.select(selectCurrentProjectId);
  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.maxLength(Section.Name.MaxLength),
        ],
        nonNullable: true,
      }),
    });
  }

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  handleCancel() {
    this.close.emit();
  }

  handleSave(projectId: number) {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(
      KanbanViewActions.createSection({
        section: {
          ...this.form.value,
          projectId,
        },
      })
    );
  }
}
