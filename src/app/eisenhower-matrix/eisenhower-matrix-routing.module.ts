import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EisenhowerMatrixComponent } from './eisenhower-matrix.component';

const routes: Routes = [{ path: '', component: EisenhowerMatrixComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EisenhowerMatrixRoutingModule { }
