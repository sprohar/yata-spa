import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { taskDetailsResolver } from '../resolvers/task-details.resolver';
import { TaskDetailsDialogEntryComponent } from '../shared/components/task-details-dialog-entry/task-details-dialog-entry.component';
import { ChronoComponent } from './chrono.component';
import { NextSevenDaysComponent } from './components/next-seven-days/next-seven-days.component';
import { TodaysTasksComponent } from './components/todays-tasks/todays-tasks.component';
import { nextSevenDaysTasksGuard } from './guards/next-seven-days-tasks.guard';
import { todaysTasksGuard } from './guards/todays-tasks.guard';

const routes: Routes = [
  {
    path: '',
    component: ChronoComponent,
    children: [
      {
        path: 'today',
        component: TodaysTasksComponent,
        canActivate: [todaysTasksGuard],
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
        path: 'upcoming',
        component: NextSevenDaysComponent,
        canActivate: [nextSevenDaysTasksGuard],
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChronoRoutingModule {}
