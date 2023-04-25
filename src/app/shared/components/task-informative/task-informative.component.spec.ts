import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInformativeComponent } from './task-informative.component';

describe('TaskInformativeComponent', () => {
  let component: TaskInformativeComponent;
  let fixture: ComponentFixture<TaskInformativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskInformativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskInformativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
