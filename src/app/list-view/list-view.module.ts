import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ListViewRoutingModule } from './list-view-routing.module';
import { ListViewComponent } from './list-view.component';


@NgModule({
  declarations: [
    ListViewComponent
  ],
  imports: [
    CommonModule,
    ListViewRoutingModule,
    SharedModule,
  ]
})
export class ListViewModule { }
