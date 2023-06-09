import { Routes } from '@angular/router';
import { projectResolver } from '../../resolvers';
import { taskDetailsResolver } from '../../resolvers/task-details.resolver';
import { TaskDetailsDialogEntryComponent } from '../../shared/components/task-details-dialog-entry/task-details-dialog-entry.component';
import { ListViewComponent } from './list-view.component';

export const listViewRoutes: Routes = [
  {
    path: ':projectId',
    component: ListViewComponent,
    resolve: {
      project: projectResolver,
    },
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
