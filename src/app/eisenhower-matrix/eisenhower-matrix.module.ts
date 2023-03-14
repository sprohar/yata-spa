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
import { CreateTaskDialogComponent } from './components/create-task-dialog/create-task-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    EisenhowerMatrixComponent,
    MatrixTaskListComponent,
    MatrixQuadrantComponent,
    CreateTaskDialogComponent
  ],
  imports: [
    CommonModule,
    EisenhowerMatrixRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class EisenhowerMatrixModule { }
