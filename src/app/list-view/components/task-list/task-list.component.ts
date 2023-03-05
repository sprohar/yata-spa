import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Section, Task } from '../../../models';
import { ListViewActions } from '../../../store/actions';

@Component({
  selector: 'yata-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() section?: Section;
  @Input() tasks!: Task[];

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    if (!this.tasks) {
      throw new Error('"tasks" is undefined');
    }
  }

  handleSelectedTask(task: Task) {
    this.router.navigate(['list', task.projectId, 'tasks', task.id]);
  }

  handleCheckbox(checked: boolean, task: Task) {
    if (checked) {
      this.store.dispatch(
        ListViewActions.markTaskAsComplete({
          task: {
            id: task.id,
            completed: true,
            projectId: task.projectId,
          },
        })
      );
    } else {
      this.store.dispatch(
        ListViewActions.markTaskAsIncomplete({
          task: {
            id: task.id,
            completed: false,
            projectId: task.projectId,
          },
        })
      );
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
