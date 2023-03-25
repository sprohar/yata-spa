import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Task } from '../../../models';

@Component({
  selector: 'yata-task-priority-picker',
  templateUrl: './task-priority-picker.component.html',
  styleUrls: ['./task-priority-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPriorityPickerComponent {
  @Output() selectionChange = new EventEmitter<Task.Priority>();
  @Input() value?: Task.Priority;
  @Input() disabled: boolean = false;

  constructor() {}

  get flagColor() {
    const priority: Task.Priority = this.value ?? Task.Priority.NONE;
    return {
      'no-priority': priority === Task.Priority.NONE,
      'high-priority': priority === Task.Priority.HIGH,
      'medium-priority': priority === Task.Priority.MEDIUM,
      'low-priority': priority === Task.Priority.LOW,
    };
  }

  handleHighPriorityChange() {
    this.value = Task.Priority.HIGH;
    this.selectionChange.emit(Task.Priority.HIGH);
  }

  handleMediumPriorityChange() {
    this.value = Task.Priority.MEDIUM;
    this.selectionChange.emit(Task.Priority.MEDIUM);
  }

  handleLowPriorityChange() {
    this.value = Task.Priority.LOW;
    this.selectionChange.emit(Task.Priority.LOW);
  }

  handleNonePriorityChange() {
    this.value = Task.Priority.NONE;
    this.selectionChange.emit(Task.Priority.NONE);
  }
}
