import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { Project } from '../models';
import { ProjectsService } from '../services/http';
import { HttpErrorService } from '../services/http/error/http-error.service';
import { YataApiActions } from '../store/actions';
import { projectResolver } from './project.resolver';

describe('ProjectResolver', () => {
  let router: jasmine.SpyObj<Router>;
  let route: jasmine.SpyObj<ActivatedRoute>;
  let httpClient: jasmine.SpyObj<HttpClient>;
  let service: ProjectsService;
  let store: MockStore;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    route = jasmine.createSpyObj('ActivatedRoute', ['']);
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ProjectsService(httpClient, new HttpErrorService());

    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: route },
        { provide: HttpClient, useValue: httpClient },
        ProjectsService,
      ],
    });

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should return a project', (done: DoneFn) => {
    const project: Project = { id: 1, name: 'Project 1' };
    httpClient.get.and.returnValue(of(project));

    const routeStub = {
      paramMap: {
        get: (_key: string) => '1',
      },
    };

    TestBed.runInInjectionContext(() => {
      const result = projectResolver(routeStub as ActivatedRouteSnapshot);

      if (result instanceof Observable) {
        result.subscribe((project) => {
          expect(project).toEqual(project);
          expect(store.dispatch).toHaveBeenCalledWith(
            YataApiActions.loadProjectSuccess({ project })
          );

          done();
        });
      } else {
        fail('projectResolver did not return an Observable');
      }
    });
  });
});
