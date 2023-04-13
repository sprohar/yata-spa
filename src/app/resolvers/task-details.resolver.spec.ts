import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { Task } from '../models';
import { TasksService } from '../services';
import { YataApiActions } from '../store/actions';
import { taskDetailsResolver } from './task-details.resolver';

describe('TaskDetailsResolver', () => {
  let router: jasmine.SpyObj<Router>;
  let route: jasmine.SpyObj<ActivatedRoute>;
  let httpClient: jasmine.SpyObj<HttpClient>;
  let service: TasksService;
  let store: MockStore;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    route = jasmine.createSpyObj('ActivatedRoute', ['']);
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    service = new TasksService(httpClient);

    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: route },
        { provide: HttpClient, useValue: httpClient },
        TasksService,
      ],
    });

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should return a task', (done: DoneFn) => {
    const task: Task = { id: 1, title: 'Task 1', projectId: 1 };
    httpClient.get.and.returnValue(of(task));

    const routeStub = {
      paramMap: {
        get: (_key: string) => '1',
      },
    };
    const stateStub = {};

    TestBed.runInInjectionContext(() => {
      const result = taskDetailsResolver(
        routeStub as ActivatedRouteSnapshot,
        stateStub as RouterStateSnapshot
      );

      if (result instanceof Observable) {
        result.subscribe((task) => {
          expect(task).toEqual(task);
          expect(store.dispatch).toHaveBeenCalledWith(
            YataApiActions.loadTaskSuccess({ task })
          );

          done();
        });
      } else {
        fail('taskDetailsResolver did not return an Observable');
      }
    });
  });
});
