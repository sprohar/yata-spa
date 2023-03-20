import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard } from './auth/guards/authentication.guard';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainComponent } from './components/main/main.component';
import { projectsGuard } from './guards/projects.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: MainComponent,
    canActivate: [authenticationGuard, projectsGuard],
    children: [
      {
        path: '',
        component: LandingPageComponent,
      },
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
