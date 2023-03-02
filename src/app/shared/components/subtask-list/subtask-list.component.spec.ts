import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { Subtask } from '../../../models';

import { SubtaskListComponent } from './subtask-list.component';

const subtasks: Subtask[] = [
  { id: 1, title: 'Subtask 1', taskId: 1 },
  { id: 2, title: 'Subtask 2', taskId: 1 },
];

describe('SubtaskListComponent', () => {
  let component: SubtaskListComponent;
  let fixture: ComponentFixture<SubtaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubtaskListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatDividerModule],
    }).compileComponents();
  });

  it('should throw an error when "subtasks" is undefined', () => {
    expect(() => {
      fixture = TestBed.createComponent(SubtaskListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }).toThrowError();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(SubtaskListComponent);
    component = fixture.componentInstance;
    component.subtasks = subtasks;
    fixture.detectChanges();

    expect(component).toBeDefined();
  });
});
