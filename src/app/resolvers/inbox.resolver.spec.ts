import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Route, Router } from '@angular/router';
import {
  RouterTestingHarness,
  RouterTestingModule,
} from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Project } from '../models';
import { ProjectsService } from '../services/http';
import { selectInbox } from '../store/selectors';
import { inboxResolver } from './inbox.resolver';

@Component({ selector: 'home' })
class HomeStubComponent {}

@Component({ selector: 'inbox' })
class InboxStubComponent {}

const routes: Route[] = [
  {
    path: '',
    component: HomeStubComponent,
  },
  {
    path: 'inbox',
    component: InboxStubComponent,
    resolve: {
      inbox: inboxResolver,
    },
  },
];

describe('InboxResolver', () => {
  let harness: RouterTestingHarness;
  let projectsServiceSpy: jasmine.SpyObj<ProjectsService>;
  let store: MockStore;

  beforeEach(async () => {
    projectsServiceSpy = jasmine.createSpyObj('ProjectsService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [HomeStubComponent, InboxStubComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        provideMockStore({
          initialState: {
            projects: {
              projects: [],
            },
          },
        }),
        {
          provide: ProjectsService,
          useValue: projectsServiceSpy,
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', HomeStubComponent);
  });

  it('should navigate to the HomeStubComponent', () => {
    expect(TestBed.inject(Router).url).toEqual('/');
  });

  it('should navigate back to the HomeStubComponent when there is no inbox in the store', async () => {
    await harness.navigateByUrl('/inbox');
    expect(TestBed.inject(Router).url).toEqual('/');
  });

  it('should navigate to the InboxStubComponent', async () => {
    const inbox: Project = { id: 1, name: 'Inbox' };

    projectsServiceSpy.get.and.returnValue(of(inbox));
    store.overrideSelector(selectInbox, inbox);
    store.refreshState();

    await harness.navigateByUrl('/inbox');
    expect(TestBed.inject(Router).url).toEqual('/inbox');
  });
});
