import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Section, Task } from '../../../models';
import { TaskOptionsMenuActions } from '../../../store/actions/task-options-menu.actions';
import { selectSections } from '../../../store/selectors';

@Component({
  selector: 'yata-task-options-menu',
  templateUrl: './task-options-menu.component.html',
  styleUrls: ['./task-options-menu.component.scss'],
})
export class TaskOptionsMenuComponent {
  @Input() task!: Task;

  sections$ = this.store
    .select(selectSections)
    .pipe(
      map((sections) => {
        console.log(sections);
        return sections.filter((section) => section.id !== this.task.sectionId)
      })
    );

  constructor(private store: Store) {}

  trackBySectionId(index: number, section: Section) {
    return section.id;
  }

  handleDelete() {
    this.store.dispatch(
      TaskOptionsMenuActions.deleteTask({
        task: this.task,
      })
    );
  }

  handleMoveTaskToSection(sectionId: number) {
    console.log('section id', sectionId);
  }

  handleDuplicate() {
    this.store.dispatch(
      TaskOptionsMenuActions.duplicateTask({
        task: this.task,
      })
    );
  }
}
