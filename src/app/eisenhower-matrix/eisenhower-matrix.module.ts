import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EisenhowerMatrixRoutingModule } from './eisenhower-matrix-routing.module';
import { EisenhowerMatrixComponent } from './eisenhower-matrix.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    EisenhowerMatrixComponent
  ],
  imports: [
    CommonModule,
    EisenhowerMatrixRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ]
})
export class EisenhowerMatrixModule { }
