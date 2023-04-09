import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';
import { MatrixQuadrantComponent } from './components/matrix-quadrant/matrix-quadrant.component';
import { EisenhowerMatrixRoutingModule } from './eisenhower-matrix-routing.module';
import { EisenhowerMatrixComponent } from './eisenhower-matrix.component';

@NgModule({
  declarations: [EisenhowerMatrixComponent, MatrixQuadrantComponent],
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
    DragDropModule,
  ],
})
export class EisenhowerMatrixModule {}
