import { NgModule } from '@angular/core';

import { MatrixQuadrantComponent } from './components/matrix-quadrant/matrix-quadrant.component';
import { EisenhowerMatrixRoutingModule } from './eisenhower-matrix-routing.module';
import { EisenhowerMatrixComponent } from './eisenhower-matrix.component';

@NgModule({
  imports: [
    EisenhowerMatrixRoutingModule,
    EisenhowerMatrixComponent,
    MatrixQuadrantComponent,
  ],
})
export class EisenhowerMatrixModule {}
