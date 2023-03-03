import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { projectTasksGuard } from '../guards/project-tasks.guard';
import { taskDetailsGuard } from '../guards/task-details.guard';
import { TaskDetailsComponent } from '../shared/components/task-details/task-details.component';
import { KanbanViewComponent } from './kanban-view.component';

const routes: Routes = [
  {
    path: ':projectId',
    component: KanbanViewComponent,
    canActivate: [projectTasksGuard],
  },
  {
    path: ':projectId/tasks/:taskId',
    component: TaskDetailsComponent,
    canActivate: [projectTasksGuard ,taskDetailsGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KanbanViewRoutingModule {}
