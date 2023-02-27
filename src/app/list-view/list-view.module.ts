import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListViewRoutingModule } from './list-view-routing.module';
import { ListViewComponent } from './list-view.component';


@NgModule({
  declarations: [
    ListViewComponent
  ],
  imports: [
    CommonModule,
    ListViewRoutingModule
  ]
})
export class ListViewModule { }
