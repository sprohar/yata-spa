import { TestBed } from '@angular/core/testing';

import { ProjectTasksGuard } from './project-tasks.guard';

describe('ProjectTasksGuard', () => {
  let guard: ProjectTasksGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProjectTasksGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
