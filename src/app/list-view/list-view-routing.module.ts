import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { projectResolver } from '../resolvers';
import { ListViewComponent } from './list-view.component';

const routes: Routes = [
  {
    path: ':projectId',
    component: ListViewComponent,
    resolve: {
      project: projectResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListViewRoutingModule {}
