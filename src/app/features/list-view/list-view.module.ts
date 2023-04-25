import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../../shared/shared.module';
import { ListViewRoutingModule } from './list-view-routing.module';
import { ListViewComponent } from './list-view.component';

@NgModule({
  declarations: [ListViewComponent],
  imports: [
    CommonModule,
    ListViewRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatRippleModule,
    DragDropModule,
    MatExpansionModule,
  ],
})
export class ListViewModule {}
