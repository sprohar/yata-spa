import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Section, Task } from '../../../models';
import { ListViewActions } from '../../../store/actions';
import { selectCurrentSection } from '../../../store/selectors';

@Component({
  selector: 'yata-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() section?: Section;
  @Input() tasks!: Task[];
  currentSection$ = this.store.select(selectCurrentSection);

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (!this.tasks) {
      throw new Error('"tasks" is undefined');
    }
  }

  handleDropped(
    event: CdkDragDrop<Section | undefined, Section | undefined, Task>
  ) {
    const source = event.previousContainer.data;
    const target = event.container.data;
    const task = event.item.data;

    if (source?.id === target?.id) {
      return;
    }

    this.store.dispatch(
      ListViewActions.moveTaskToSection({
        task: {
          id: task.id,
          projectId: task.projectId,
          sectionId: target ? target.id : null,
        },
      })
    );
  }
}
