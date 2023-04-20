import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { authenticationGuard } from './auth/guards/authentication.guard';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainComponent } from './components/main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { projectsGuard, tagsGuard } from './guards/';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'app',
    component: MainComponent,
    // canActivate: [AuthGuard, projectsGuard, tagsGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'chrono',
        loadChildren: () =>
          import('./chrono/chrono.module').then((m) => m.ChronoModule),
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
      {
        path: 'tags',
        loadChildren: () =>
          import('./tags/tags.module').then((m) => m.TagsModule),
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
