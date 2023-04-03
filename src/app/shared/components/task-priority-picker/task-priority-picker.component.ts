import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Priority } from '../../../models';

@Component({
  selector: 'yata-task-priority-picker',
  templateUrl: './task-priority-picker.component.html',
  styleUrls: ['./task-priority-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPriorityPickerComponent {
  @Output() selectionChange = new EventEmitter<Priority>();
  @Input() value?: Priority;
  @Input() disabled: boolean = false;

  constructor() {}

  get flagColor() {
    const priority: Priority = this.value ?? Priority.NONE;
    return {
      'no-priority': priority === Priority.NONE,
      'high-priority': priority === Priority.HIGH,
      'medium-priority': priority === Priority.MEDIUM,
      'low-priority': priority === Priority.LOW,
    };
  }

  handleHighPriorityChange() {
    this.value = Priority.HIGH;
    this.selectionChange.emit(Priority.HIGH);
  }

  handleMediumPriorityChange() {
    this.value = Priority.MEDIUM;
    this.selectionChange.emit(Priority.MEDIUM);
  }

  handleLowPriorityChange() {
    this.value = Priority.LOW;
    this.selectionChange.emit(Priority.LOW);
  }

  handleNonePriorityChange() {
    this.value = Priority.NONE;
    this.selectionChange.emit(Priority.NONE);
  }
}
