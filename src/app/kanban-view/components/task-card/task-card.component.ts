import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../../models';

@Component({
  selector: 'yata-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (!this.task) {
      throw new Error('Method not implemented.');
    }
  }

  get borderColor() {
    return {
      'border-left-red': this.task.priority === Task.Priority.HIGH,
      'border-left-orange': this.task.priority === Task.Priority.MEDIUM,
      'border-left-blue': this.task.priority === Task.Priority.LOW,
    };
  }
}
