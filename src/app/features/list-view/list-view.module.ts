import { NgModule } from '@angular/core';

import { ListViewRoutingModule } from './list-view-routing.module';
import { ListViewComponent } from './list-view.component';

@NgModule({
  imports: [ListViewRoutingModule, ListViewComponent],
})
export class ListViewModule {}
