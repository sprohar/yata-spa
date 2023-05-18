import { Routes } from '@angular/router';
import { projectResolver } from '../../resolvers';
import { taskDetailsResolver } from '../../resolvers/task-details.resolver';
import { TaskDetailsDialogEntryComponent } from '../../shared/components/task-details-dialog-entry/task-details-dialog-entry.component';
import { KanbanViewComponent } from './kanban-view.component';

export const kanbanViewRoutes: Routes = [
  {
    path: ':projectId',
    component: KanbanViewComponent,
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
