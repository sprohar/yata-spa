import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Section } from '../../../models';
import { KanbanViewActions } from '../../../store/actions';
import { selectCurrentProjectId } from '../../../store/reducers/projects.reducer';

@Component({
  selector: 'yata-create-kanban-column',
  templateUrl: './create-kanban-column.component.html',
  styleUrls: ['./create-kanban-column.component.scss'],
})
export class CreateKanbanColumnComponent implements OnDestroy, OnInit {
  @Output() close = new EventEmitter<void>();
  currentProjectId$ = this.store.select(selectCurrentProjectId);
  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

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

  handleCancel() {
    this.close.emit();
  }

  handleSave(projectId: number) {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(
      KanbanViewActions.addSection({
        section: {
          ...this.form.value,
          projectId,
        },
      })
    );
  }
}
