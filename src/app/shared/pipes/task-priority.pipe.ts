import { Pipe, PipeTransform } from '@angular/core';
import { Priority } from '../../models';

@Pipe({
  name: 'taskPriority',
})
export class TaskPriorityPipe implements PipeTransform {
  transform(value: Priority, ..._args: unknown[]): unknown {
    switch (value) {
      case Priority.NONE:
        return 'None';
      case Priority.HIGH:
        return 'High';
      case Priority.MEDIUM:
        return 'Medium';
      case Priority.LOW:
        return 'Low';
      default:
        return '';
    }
  }
}
