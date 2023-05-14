import { NgModule } from '@angular/core';

import { ChronoRoutingModule } from './chrono-routing.module';
import { ChronoComponent } from './chrono.component';
import { TodaysTasksComponent } from './components/todays-tasks/todays-tasks.component';

@NgModule({
  imports: [ChronoRoutingModule, ChronoComponent, TodaysTasksComponent],
})
export class ChronoModule {}
