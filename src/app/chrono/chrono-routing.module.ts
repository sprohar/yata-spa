import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChronoComponent } from './chrono.component';
import { TodaysTasksComponent } from './components/todays-tasks/todays-tasks.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChronoRoutingModule {}
