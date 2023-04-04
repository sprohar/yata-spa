import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { projectResolver } from '../resolvers';
import { KanbanViewComponent } from './kanban-view.component';

const routes: Routes = [
  {
    path: ':projectId',
    component: KanbanViewComponent,
    resolve: {
      project: projectResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KanbanViewRoutingModule {}
