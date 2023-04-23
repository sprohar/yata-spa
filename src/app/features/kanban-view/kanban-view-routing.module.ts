import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { projectResolver } from '../../resolvers';
import { taskDetailsResolver } from '../../resolvers/task-details.resolver';
import { TaskDetailsDialogEntryComponent } from '../../shared/components/task-details-dialog-entry/task-details-dialog-entry.component';
import { KanbanViewComponent } from './kanban-view.component';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KanbanViewRoutingModule {}
