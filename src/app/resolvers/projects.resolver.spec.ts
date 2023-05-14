import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Route, Router } from '@angular/router';
import {
  RouterTestingHarness,
  RouterTestingModule,
} from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { PaginatedList } from '../interfaces';
import { Project } from '../models';
import { ProjectsService } from '../services/http';
import { projectsResolver } from './projects.resolver';

@Component({
  selector: 'home',
  standalone: true,
})
class HomeStubComponent {}

@Component({
  selector: 'inbox',
  standalone: true,
})
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
      projects: projectsResolver,
    },
  },
];

describe('ProjectsResolver', () => {
  let harness: RouterTestingHarness;
  let projectsServiceSpy: jasmine.SpyObj<ProjectsService>;

  beforeEach(async () => {
    projectsServiceSpy = jasmine.createSpyObj('ProjectsService', ['getAll']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HomeStubComponent,
        InboxStubComponent,
      ],
      providers: [
        provideMockStore({}),
        {
          provide: ProjectsService,
          useValue: projectsServiceSpy,
        },
      ],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', HomeStubComponent);
  });

  it('should navigate to the HomeStubComponent', () => {
    expect(TestBed.inject(Router).url).toEqual('/');
  });

  it('should navigate to "/inbox"', async () => {
    const projects: Project[] = [
      { id: 1, name: 'Inbox' },
      { id: 2, name: 'Project 1' },
    ];

    const stubResponse: PaginatedList<Project> = {
      pageIndex: 0,
      pageSize: 10,
      count: projects.length,
      data: projects,
    };

    projectsServiceSpy.getAll.and.returnValue(of(stubResponse));

    await harness.navigateByUrl('/inbox');
    expect(TestBed.inject(Router).url).toEqual('/inbox');
  });
});
