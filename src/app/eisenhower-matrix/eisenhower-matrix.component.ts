import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'yata-eisenhower-matrix',
  templateUrl: './eisenhower-matrix.component.html',
  styleUrls: ['./eisenhower-matrix.component.scss']
})
export class EisenhowerMatrixComponent {

  constructor(private store: Store) { }
}
