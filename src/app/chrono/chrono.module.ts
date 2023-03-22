import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChronoRoutingModule } from './chrono-routing.module';
import { ChronoComponent } from './chrono.component';
import { TodaysTasksComponent } from './components/todays-tasks/todays-tasks.component';
import { SharedModule } from '../shared/shared.module';
import { NextSevenDaysComponent } from './components/next-seven-days/next-seven-days.component';


@NgModule({
  declarations: [
    ChronoComponent,
    TodaysTasksComponent,
    NextSevenDaysComponent
  ],
  imports: [
    CommonModule,
    ChronoRoutingModule,
    SharedModule,
  ]
})
export class ChronoModule { }
