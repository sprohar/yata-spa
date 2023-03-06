import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environment/environment';
import { Task } from '../models';

import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(TasksService);
    httpClient = TestBed.inject(HttpClient);
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

      const url = `${environment.apiUrl}/tasks`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('POST');

      req.flush(task);
    });
  });

  describe('#delete', () => {
    it('should make a DELETE request to delete a task', () => {
      const task: Task = {id: 1,  title: 'Title', projectId: 1 };

      service.delete(task).subscribe((data) => expect(data).toEqual(task));

      const url = `${environment.apiUrl}/tasks/${task.id}`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('DELETE');

      req.flush(task);
    });
  });

  describe('#get', () => {
    it('should make a GEt request to fetch a task', () => {
      const task: Task = {id: 1,  title: 'Title', projectId: 1 };

      service.get(task.id!).subscribe((data) => expect(data).toEqual(task));

      const url = `${environment.apiUrl}/tasks/${task.id}`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('GET');

      req.flush(task);
    });
  });

  describe('#getProjects', () => {
    it(`should make a GET request to fetch a project's tasks`, () => {
      const task: Task = {id: 1,  title: 'Title', projectId: 1 };

      service.getProjectTasks(task.projectId).subscribe();

      const url = `${environment.apiUrl}/projects/${task.projectId}/tasks`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('GET');

      req.flush(task);
    });
  });

  describe('#update', () => {
    it('should make a PATCH request to update a task', () => {
      const task: Task = {id: 1,  title: 'Title', projectId: 1 };

      service.update(task).subscribe((data) => expect(data).toEqual(task));

      const url = `${environment.apiUrl}/tasks/${task.id}`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('PATCH');

      req.flush(task);
    });
  });
});
