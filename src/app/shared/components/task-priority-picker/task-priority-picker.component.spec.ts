import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Priority } from '../../../models';

import { TaskPriorityPickerComponent } from './task-priority-picker.component';

describe('TaskPriorityPickerComponent', () => {
  let component: TaskPriorityPickerComponent;
  let fixture: ComponentFixture<TaskPriorityPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskPriorityPickerComponent],
      imports: [
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskPriorityPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change priority to HIGH', () => {
    spyOn(component.selectionChange, 'emit');
    component.handleHighPriorityChange();
    expect(component.selectionChange.emit).toHaveBeenCalledWith(Priority.HIGH);
  });

  it('should change priority to MEDIUM', () => {
    spyOn(component.selectionChange, 'emit');
    component.handleMediumPriorityChange();
    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      Priority.MEDIUM
    );
  });

  it('should change priority to LOW', () => {
    spyOn(component.selectionChange, 'emit');
    component.handleLowPriorityChange();
    expect(component.selectionChange.emit).toHaveBeenCalledWith(Priority.LOW);
  });

  it('should change priority to NONE', () => {
    spyOn(component.selectionChange, 'emit');
    component.handleNonePriorityChange();
    expect(component.selectionChange.emit).toHaveBeenCalledWith(Priority.NONE);
  });
});
