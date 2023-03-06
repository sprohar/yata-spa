import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Section, Task } from '../../../models';
import { ListViewActions } from '../../../store/actions';

@Component({
  selector: 'yata-create-section-task-list-item',
  templateUrl: './create-section-task-list-item.component.html',
  styleUrls: ['./create-section-task-list-item.component.scss'],
})
export class CreateSectionTaskListItem implements OnInit {
  @Input() section!: Section;
  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.section) {
      throw new Error(`"section" is undefined.`);
    }

    this.initForm(this.section);
  }

  initForm(section: Section) {
    this.form = this.fb.group({
      sectionId: [section.id],
      projectId: [section.projectId],
      title: [
        '',
        [Validators.required, Validators.maxLength(Task.Title.MaxLength)],
      ],
    });
  }

  close() {
    this.store.dispatch(ListViewActions.closeCreateSectionTaskListItem());
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    
    this.store.dispatch(ListViewActions.createTaskInSection({
      task: this.form.value,
    }))
  }
}
