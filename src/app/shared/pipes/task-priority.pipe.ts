import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Pipe({
  name: 'taskPriority',
})
export class TaskPriorityPipe implements PipeTransform {
  transform(value: Task.Priority, ...args: unknown[]): unknown {
    switch (value) {
      case Task.Priority.NONE:
        return 'None';
      case Task.Priority.HIGH:
        return 'High';
      case Task.Priority.MEDIUM:
        return 'Medium';
      case Task.Priority.LOW:
        return 'Low';
      default:
        throw new Error('enum Priority: Invalid value');
    }
  }
}
