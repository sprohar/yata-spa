import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environment/environment';
import { Task } from '../models';

import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(TasksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#create', () => {
    it('should make a POST request to create a new task', () => {
      const task: Task = { title: 'Title', projectId: 1 };
      service.create(task).subscribe((data) => expect(data).toEqual(task));

      const url = `${environment.apiUrl}/projects/${task.projectId}/tasks`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('POST');

      req.flush(task);
    });
  });

  describe('#delete', () => {
    it('should make a DELETE request to delete a task', () => {
      const task: Task = { id: 1, title: 'Title', projectId: 1 };

      service.delete(task).subscribe((data) => expect(data).toEqual(task));

      const url = `${environment.apiUrl}/projects/${task.projectId}/tasks/${task.id}`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('DELETE');

      req.flush(task);
    });
  });

  describe('#get', () => {
    it('should make a GET request to fetch a task', () => {
      const task: Task = { id: 1, title: 'Title', projectId: 1 };

      service
        .get(task.projectId, task.id!)
        .subscribe((data) => expect(data).toEqual(task));

      const url = `${environment.apiUrl}/projects/${task.projectId}/tasks/${task.id}`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('GET');

      req.flush(task);
    });
  });

  describe('#getAll', () => {
    it(`should make a GET request to fetch a project's tasks`, () => {
      const task: Task = { id: 1, title: 'Title', projectId: 1 };

      service.getAll(task.projectId).subscribe();

      const url = `${environment.apiUrl}/projects/${task.projectId}/tasks`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('GET');

      req.flush(task);
    });
  });

  describe('#update', () => {
    it('should make a PATCH request to update a task', () => {
      const task: Task = { id: 1, title: 'Title', projectId: 1 };

      service
        .update(task.id!, task)
        .subscribe((data) => expect(data).toEqual(task));

      const url = `${environment.apiUrl}/projects/${task.projectId}/tasks/${task.id}`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('PATCH');

      req.flush(task);
    });
  });
});
