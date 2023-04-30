import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewSettingComponent } from './task-view-setting.component';

describe('TaskViewSettingComponent', () => {
  let component: TaskViewSettingComponent;
  let fixture: ComponentFixture<TaskViewSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskViewSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskViewSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
