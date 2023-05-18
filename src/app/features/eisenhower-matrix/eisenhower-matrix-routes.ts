import { Routes } from '@angular/router';
import { taskDetailsResolver } from '../../resolvers/task-details.resolver';
import { TaskDetailsDialogEntryComponent } from '../../shared/components/task-details-dialog-entry/task-details-dialog-entry.component';
import { EisenhowerMatrixComponent } from './eisenhower-matrix.component';
import { tasksResolver } from './resolvers/matrix.resolver';

export const matrixRoutes: Routes = [
  {
    path: '',
    component: EisenhowerMatrixComponent,
    resolve: {
      tasks: tasksResolver,
    },
    children: [
      {
        path: 'p/:projectId/tasks/:taskId',
        component: TaskDetailsDialogEntryComponent,
        resolve: {
          task: taskDetailsResolver,
        },
      },
    ],
  },
];
