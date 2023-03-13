import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import {
  selectHighPriorityTasks,
  selectLowPriorityTasks,
  selectMediumPriorityTasks,
  selectNoPriorityTasks,
} from '../store/selectors';

@Component({
  selector: 'yata-eisenhower-matrix',
  templateUrl: './eisenhower-matrix.component.html',
  styleUrls: ['./eisenhower-matrix.component.scss'],
})
export class EisenhowerMatrixComponent implements OnInit {
  noPriorityTasks$ = this.store.select(selectNoPriorityTasks);
  lowPriorityTasks$ = this.store.select(selectLowPriorityTasks);
  mediumPriorityTasks$ = this.store.select(selectMediumPriorityTasks);
  highPriorityTasks$ = this.store.select(selectHighPriorityTasks);

  constructor(private store: Store, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Eisenhower Matrix - Yata');
  }
}
