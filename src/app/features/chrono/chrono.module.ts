import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from '../../shared/shared.module';
import { ChronoRoutingModule } from './chrono-routing.module';
import { ChronoComponent } from './chrono.component';
import { TodaysTasksComponent } from './components/todays-tasks/todays-tasks.component';

@NgModule({
  declarations: [ChronoComponent, TodaysTasksComponent],
  imports: [
    CommonModule,
    ChronoRoutingModule,
    SharedModule,
    MatDividerModule,
    MatExpansionModule,
  ],
})
export class ChronoModule {}
