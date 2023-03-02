import { Component, Input, OnInit } from '@angular/core';
import { Subtask } from '../../../models';

@Component({
  selector: 'yata-subtask-list',
  templateUrl: './subtask-list.component.html',
  styleUrls: ['./subtask-list.component.scss'],
})
export class SubtaskListComponent implements OnInit {
  @Input() subtasks!: Subtask[];

  constructor() {}

  ngOnInit(): void {
    if (!this.subtasks) {
      throw new Error('"subtasks" is undefined');
    }
  }

  trackBySubtaskId(index: number, subtask: Subtask) {
    return subtask.id;
  }
}
