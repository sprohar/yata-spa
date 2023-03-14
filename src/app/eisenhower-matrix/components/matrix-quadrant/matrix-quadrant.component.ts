import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../models';

@Component({
  selector: 'yata-matrix-quadrant',
  templateUrl: './matrix-quadrant.component.html',
  styleUrls: ['./matrix-quadrant.component.scss'],
})
export class MatrixQuadrantComponent implements OnInit {
  @Input() tasks!: Task[];
  @Input() priority!: Task.Priority;

  constructor() {}

  ngOnInit(): void {}

  get headerText() {
    switch (this.priority) {
      case Task.Priority.HIGH:
        return 'Urgent & Important';
      case Task.Priority.MEDIUM:
        return 'Not Urgent & Important';
      case Task.Priority.LOW:
        return 'Urgent & Unimportant';
      case Task.Priority.NONE:
        return 'Not Urgent & Unimportant';
      default:
        return '';
    }
  }

  get headerTextColorClassName() {
    return {
      'high-priority': this.priority === Task.Priority.HIGH,
      'medium-priority': this.priority === Task.Priority.MEDIUM,
      'low-priority': this.priority === Task.Priority.LOW,
      'no-priority': this.priority === Task.Priority.NONE,
    };
  }
}
