import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Store } from '@ngrx/store';
import { Task } from '../../../models';

@Component({
  selector: 'yata-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() tasks!: Task[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (!this.tasks) {
      throw new Error('"tasks" is undefined');
    }
  }

  handleSelectedTask(task: Task) {
    console.log(task);
  }

  handleCompletedToggle(event: MatCheckboxChange) {
    const element: HTMLElement = event.source._elementRef.nativeElement;
    console.log('toggled');
  }
}
