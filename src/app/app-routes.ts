import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/authentication.guard';
import { InboxComponent } from './components/inbox/inbox.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainComponent } from './components/main/main.component';
import {
  inboxResolver,
  projectsResolver,
  taskDetailsResolver,
} from './resolvers';
import { tagsResolver } from './resolvers/tags.resolver';
import { TaskDetailsDialogEntryComponent } from './shared/components/task-details-dialog-entry/task-details-dialog-entry.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'app',
    component: MainComponent,
    canMatch: [authGuard],
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
          import('./features/chrono/chrono-routes').then((m) => m.chronoRoutes),
      },
      {
        path: 'kanban',
        loadChildren: () =>
          import('./features/kanban-view/kanban-view-routes').then(
            (m) => m.kanbanViewRoutes
          ),
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./features/list-view/list-view-routes').then(
            (m) => m.listViewRoutes
          ),
      },
      {
        path: 'matrix',
        loadChildren: () =>
          import('./features/eisenhower-matrix/eisenhower-matrix-routes').then(
            (m) => m.matrixRoutes
          ),
      },
      {
        path: 'preferences',
        loadChildren: () =>
          import('./features/preferences/preferences-routes').then(
            (m) => m.preferencesRoutes
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile-routes').then(
            (m) => m.profileRoutes
          ),
      },
      {
        path: 'tags',
        loadChildren: () =>
          import('./features/tags/tags-routes').then((m) => m.tagsRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/app/inbox',
  },
];
