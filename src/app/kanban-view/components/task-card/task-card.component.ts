import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../../models';

@Component({
  selector: 'yata-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.task) {
      throw new Error('Method not implemented.');
    }
  }

  get borderColor() {
    return {
      'border-left-red': this.task.priority === Task.Priority.HIGH,
      'border-left-yellow': this.task.priority === Task.Priority.MEDIUM,
      'border-left-blue': this.task.priority === Task.Priority.LOW,
    };
  }

  handleViewTask() {
    this.router.navigate([
      'kanban',
      this.task.projectId!,
      'tasks',
      this.task.id!,
    ]);
  }
}
