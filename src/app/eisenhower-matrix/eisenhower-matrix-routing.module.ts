import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { taskDetailsResolver } from '../resolvers/task-details.resolver';
import { TaskDetailsDialogEntryComponent } from '../shared/components/task-details-dialog-entry/task-details-dialog-entry.component';
import { EisenhowerMatrixComponent } from './eisenhower-matrix.component';
import { eisenhowerMatrixGuard } from './guards/eisenhower-matrix-tasks.guard';

const routes: Routes = [
  {
    path: '',
    component: EisenhowerMatrixComponent,
    canActivate: [eisenhowerMatrixGuard],
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EisenhowerMatrixRoutingModule {}
