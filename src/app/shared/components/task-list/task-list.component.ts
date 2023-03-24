import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Section, Task } from '../../../models';
import { ListViewActions } from '../../../store/actions';

@Component({
  selector: 'yata-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  handleDropped(
    event: CdkDragDrop<Section, Section | any | undefined, Task | any>
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
