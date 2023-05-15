import { Pipe, PipeTransform } from '@angular/core';
import { Priority } from '../../models';

@Pipe({
  name: 'taskPriority',
  standalone: true,
})
export class TaskPriorityPipe implements PipeTransform {
  transform(value: Priority | undefined, ..._args: unknown[]): unknown {
    switch (value) {
      case Priority.NONE:
        return 'No priority';
      case Priority.HIGH:
        return 'High priority';
      case Priority.MEDIUM:
        return 'Medium priority';
      case Priority.LOW:
        return 'Low priority';
      default:
        return '';
    }
  }
}
