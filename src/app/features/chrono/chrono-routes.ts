import { Routes } from '@angular/router';
import { taskDetailsResolver } from '../../resolvers/task-details.resolver';
import { TaskDetailsDialogEntryComponent } from '../../shared/components/task-details-dialog-entry/task-details-dialog-entry.component';
import { ChronoComponent } from './chrono.component';
import { TodaysTasksComponent } from './components/todays-tasks/todays-tasks.component';
import { todaysTasksResolver } from './resolvers/todays-tasks.resolver';

export const chronoRoutes: Routes = [
  {
    path: '',
    component: ChronoComponent,
    children: [
      {
        path: 'today',
        component: TodaysTasksComponent,
        resolve: {
          paginatedList: todaysTasksResolver,
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
    ],
  },
];
