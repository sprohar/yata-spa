import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environment/environment';
import { Project } from '../models';

import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ProjectsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#create', () => {
    it('should make a POST request to create a new project', () => {
      const project: Project = { name: 'Title' };
      service.create(project).subscribe((data) => expect(data).toEqual(project));

      const url = `${environment.apiUrl}/projects`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('POST');

      req.flush(project);
    });
  });

  describe('#delete', () => {
    it('should make a DELETE request to delete a project', () => {
      const project: Project = {id: 1,  name: 'Title' };

      service.delete(project.id!).subscribe((data) => expect(data).toEqual(project));

      const url = `${environment.apiUrl}/projects/${project.id}`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('DELETE');

      req.flush(project);
    });
  });

  describe('#get', () => {
    it('should make a GEt request to fetch a project', () => {
      const project: Project = {id: 1,  name: 'Title' };

      service.get(project.id!).subscribe((data) => expect(data).toEqual(project));

      const url = `${environment.apiUrl}/projects/${project.id}`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('GET');

      req.flush(project);
    });
  });

  describe('#getAll', () => {
    it(`should make a GET request to fetch a project's tasks`, () => {
      const project: Project = {id: 1,  name: 'Title' };

      service.getAll().subscribe();

      const url = `${environment.apiUrl}/projects`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('GET');

      req.flush(project);
    });
  });

  describe('#update', () => {
    it('should make a PATCH request to update a project', () => {
      const project: Project = {id: 1,  name: 'Title' };

      service.update(project.id!, project).subscribe((data) => expect(data).toEqual(project));

      const url = `${environment.apiUrl}/projects/${project.id}`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('PATCH');

      req.flush(project);
    });
  });
});
