import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environment/environment';
import { Project, Section } from '../models';

import { SectionsService } from './sections.service';

describe('SectionsService', () => {
  let service: SectionsService;
  let httpTestingController: HttpTestingController;
  const project: Project = { id: 1, name: 'Project' };
  const section: Section = { id: 1, name: 'Section', projectId: project.id! };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(SectionsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#create', () => {
    it('should make a POST request to create a new project', () => {
      const section: Section = { name: 'Section', projectId: project.id! };
      service
        .create(section)
        .subscribe((data) => expect(data).toEqual(section));

      const url = `${environment.apiUrl}/projects/${section.projectId}/sections`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('POST');

      req.flush(section);
    });
  });

  describe('#delete', () => {
    it('should make a DELETE request to delete a project', () => {
      service.delete(section).subscribe();

      const url = `${environment.apiUrl}/projects/${project.id}/sections/${section.id}`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('DELETE');

      req.flush(section);
    });
  });

  describe('#get', () => {
    it('should make a GEt request to fetch a project', () => {
      service
        .get(project.id!, section.id!)
        .subscribe((data) => expect(data).toEqual(section));

      const url = `${environment.apiUrl}/projects/${section.projectId}/sections/${section.id}`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('GET');

      req.flush(section);
    });
  });

  describe('#getAll', () => {
    it(`should make a GET request to fetch a project's tasks`, () => {
      service.getAll(project.id!).subscribe();

      const url = `${environment.apiUrl}/projects/${project.id}`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('GET');

      req.flush(section);
    });
  });

  describe('#update', () => {
    it('should make a PATCH request to update a project', () => {
      service
        .update(section)
        .subscribe((data) => expect(data).toEqual(section));

      const url = `${environment.apiUrl}/projects/${project.id}/sections/${section.id}`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toEqual('PATCH');

      req.flush(section);
    });
  });
});
