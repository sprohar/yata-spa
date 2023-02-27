import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectTasksGuard } from '../guards/project-tasks.guard';
import { KanbanViewComponent } from './kanban-view.component';

const routes: Routes = [
  {
    path: ':projectId',
    component: KanbanViewComponent,
    canActivate: [ProjectTasksGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KanbanViewRoutingModule {}
