import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../shared/shared.module';
import { ProjectSectionComponent } from './components/project-section/project-section.component';
import { ListViewRoutingModule } from './list-view-routing.module';
import { ListViewComponent } from './list-view.component';

@NgModule({
  declarations: [ListViewComponent, ProjectSectionComponent],
  imports: [
    CommonModule,
    ListViewRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatRippleModule,
    DragDropModule,
  ],
})
export class ListViewModule {}
