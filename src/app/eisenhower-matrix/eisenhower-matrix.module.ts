import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EisenhowerMatrixRoutingModule } from './eisenhower-matrix-routing.module';
import { EisenhowerMatrixComponent } from './eisenhower-matrix.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatrixTaskListComponent } from './components/matrix-task-list/matrix-task-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatrixQuadrantComponent } from './components/matrix-quadrant/matrix-quadrant.component';


@NgModule({
  declarations: [
    EisenhowerMatrixComponent,
    MatrixTaskListComponent,
    MatrixQuadrantComponent
  ],
  imports: [
    CommonModule,
    EisenhowerMatrixRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDividerModule,
  ]
})
export class EisenhowerMatrixModule { }
