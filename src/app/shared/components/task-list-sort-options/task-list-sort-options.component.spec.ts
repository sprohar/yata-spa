import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TaskListSortOptionsComponent } from './task-list-sort-options.component';

describe('TaskListSortOptionsComponent', () => {
  let component: TaskListSortOptionsComponent;
  let fixture: ComponentFixture<TaskListSortOptionsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListSortOptionsComponent ],
      imports: [MatButtonModule, MatIconModule, MatMenuModule, NoopAnimationsModule],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListSortOptionsComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
