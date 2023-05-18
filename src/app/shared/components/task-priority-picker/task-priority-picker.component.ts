import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Priority } from '../../../models';

@Component({
  selector: 'yata-task-priority-picker',
  templateUrl: './task-priority-picker.component.html',
  styleUrls: ['./task-priority-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, NgClass],
})
export class TaskPriorityPickerComponent {
  @Output() readonly selectionChange = new EventEmitter<Priority>();
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
