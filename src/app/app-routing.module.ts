import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'kanban',
    loadChildren: () =>
      import('./kanban-view/kanban-view.module').then(
        (m) => m.KanbanViewModule
      ),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./list-view/list-view.module').then((m) => m.ListViewModule),
  },
  {
    path: 'matrix',
    loadChildren: () =>
      import('./eisenhower-matrix/eisenhower-matrix.module').then(
        (m) => m.EisenhowerMatrixModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
