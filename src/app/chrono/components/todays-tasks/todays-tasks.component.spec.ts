import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodaysTasksComponent } from './todays-tasks.component';
import { MatDividerModule } from '@angular/material/divider';

describe('TodaysTasksComponent', () => {
  let component: TodaysTasksComponent;
  let fixture: ComponentFixture<TodaysTasksComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodaysTasksComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatDividerModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(TodaysTasksComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
