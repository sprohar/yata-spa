import { Route } from '@angular/router';
import { taskDetailsResolver } from '../../resolvers/task-details.resolver';
import { TaskDetailsDialogEntryComponent } from '../../shared/components/task-details-dialog-entry/task-details-dialog-entry.component';
import { taggedTasksGuard } from './guards/tagged-tasks.guard';
import { TagsComponent } from './tags.component';

export const tagsRoutes: Route[] = [
  {
    path: ':tagId',
    component: TagsComponent,
    canActivate: [taggedTasksGuard],
    children: [
      {
        path: 'tasks/:taskId',
        component: TaskDetailsDialogEntryComponent,
        resolve: {
          task: taskDetailsResolver,
        },
      },
    ],
  },
];
