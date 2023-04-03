import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NextSevenDaysComponent } from './next-seven-days.component';

const initialState = {
  tasks: {
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        projectId: 1,
        dueDate: '2021-08-01T00:00:00.000Z',
        completed: false,
      },
      {
        id: 2,
        title: 'Task 2',
        projectId: 1,
        dueDate: '2021-08-01T00:00:00.000Z',
        completed: false,
      },
      {
        id: 3,
        title: 'Task 3',
        projectId: 1,
        dueDate: '2021-08-02T00:00:00.000Z',
        completed: false,
      },
    ],
  },
};

describe('NextSevenDaysComponent', () => {
  let component: NextSevenDaysComponent;
  let fixture: ComponentFixture<NextSevenDaysComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextSevenDaysComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatDividerModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(NextSevenDaysComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
