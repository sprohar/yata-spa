import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOptionsMenuComponent } from './task-options-menu.component';

describe('TaskOptionsMenuComponent', () => {
  let component: TaskOptionsMenuComponent;
  let fixture: ComponentFixture<TaskOptionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskOptionsMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskOptionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
