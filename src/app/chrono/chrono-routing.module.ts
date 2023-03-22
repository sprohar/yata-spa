import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      },
      {
        path: 'upcoming',
        component: NextSevenDaysComponent,
        canActivate: [nextSevenDaysTasksGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChronoRoutingModule {}
