import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Task } from '../../../models';

import { TaskCardComponent } from './task-card.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;
  let router: jasmine.SpyObj<Router>;
  let task: Task = {
    id: 1,
    title: 'Task',
    projectId: 1,
  };

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [TaskCardComponent],
      imports: [MatCardModule, MatIconModule, MatRippleModule],
      providers: [
        {
          provide: Router,
          useValue: router,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    component.task = task;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleViewTask', () => {
    it('should navigate to "/kanban/:projectId/tasks/:taskId"', () => {
      component.handleViewTask();

      const spy = router.navigate as jasmine.Spy;
      const navArgs = spy.calls.first().args[0];

      expect(navArgs).toEqual(['kanban', task.projectId, 'tasks', task.id]);
    });
  });
});
