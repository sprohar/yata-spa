import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task } from '../../../models';
import { ListViewActions } from '../../../store/actions';

@Component({
  selector: 'yata-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
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
}
