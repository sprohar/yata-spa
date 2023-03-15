import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { authenticationGuard } from './auth/guards/authentication.guard';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'kanban',
    canActivate: [authenticationGuard],
    loadChildren: () =>
      import('./kanban-view/kanban-view.module').then(
        (m) => m.KanbanViewModule
      ),
  },
  {
    path: 'list',
    canActivate: [authenticationGuard],
    loadChildren: () =>
      import('./list-view/list-view.module').then((m) => m.ListViewModule),
  },
  {
    path: 'matrix',
    canActivate: [authenticationGuard],
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
