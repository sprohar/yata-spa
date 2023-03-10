import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { projectTasksGuard } from '../guards/project-tasks.guard';
import { ListViewComponent } from './list-view.component';

const routes: Routes = [
  {
    path: ':projectId',
    component: ListViewComponent,
    canActivate: [projectTasksGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListViewRoutingModule {}
