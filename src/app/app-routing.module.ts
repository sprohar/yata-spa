import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { authGuard } from './auth/guards/authentication.guard';
import { InboxComponent } from './components/inbox/inbox.component';
import { MainComponent } from './components/main/main.component';
import {
  inboxResolver,
  projectsResolver,
  taskDetailsResolver,
} from './resolvers';
import { tagsResolver } from './resolvers/tags.resolver';
import { TaskDetailsDialogEntryComponent } from './shared/components/task-details-dialog-entry/task-details-dialog-entry.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: MainComponent,
    // canMatch: [authGuard],
    resolve: {
      projects: projectsResolver,
      tags: tagsResolver,
    },
    children: [
      {
        path: '',
        redirectTo: 'inbox',
        pathMatch: 'full',
      },
      {
        path: 'inbox',
        component: InboxComponent,
        resolve: {
          inbox: inboxResolver,
        },
        children: [
          {
            path: 'tasks/:taskId',
            component: TaskDetailsDialogEntryComponent,
            resolve: {
              task: taskDetailsResolver,
            },
          },
        ],
      },
      {
        path: 'chrono',
        loadChildren: () =>
          import('./features/chrono/chrono.module').then((m) => m.ChronoModule),
      },
      {
        path: 'kanban',
        loadChildren: () =>
          import('./features/kanban-view/kanban-view.module').then(
            (m) => m.KanbanViewModule
          ),
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./features/list-view/list-view.module').then(
            (m) => m.ListViewModule
          ),
      },
      {
        path: 'matrix',
        loadChildren: () =>
          import('./features/eisenhower-matrix/eisenhower-matrix.module').then(
            (m) => m.EisenhowerMatrixModule
          ),
      },
      {
        path: 'tags',
        loadChildren: () =>
          import('./features/tags/tags.module').then((m) => m.TagsModule),
      },
      {
        path: 'preferences',
        loadChildren: () =>
          import('./features/preferences/preferences.module').then(
            (m) => m.PreferencesModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.module').then(
            (m) => m.ProfileModule
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
