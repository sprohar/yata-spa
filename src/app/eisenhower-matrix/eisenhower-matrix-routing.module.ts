import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EisenhowerMatrixComponent } from './eisenhower-matrix.component';
import { eisenhowerMatrixGuard } from './guards/eisenhower-matrix-tasks.guard';

const routes: Routes = [
  {
    path: '',
    component: EisenhowerMatrixComponent,
    canActivate: [eisenhowerMatrixGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EisenhowerMatrixRoutingModule {}
