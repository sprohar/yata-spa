import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Section } from '../../../models';
import { ListViewActions } from '../../../store/actions';

@Component({
  selector: 'yata-project-section',
  templateUrl: './project-section.component.html',
  styleUrls: ['./project-section.component.scss'],
})
export class ProjectSectionComponent implements OnInit {
  @Input() section!: Section;
  expanded = true;

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (!this.section) {
      throw new Error('"section" is undefined');
    }
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  handleAddTask() {
    // TODO: Unit test this
    this.store.dispatch(
      ListViewActions.openCreateSectionTaskListItem({
        sectionId: this.section.id!,
      })
    );
  }
}
