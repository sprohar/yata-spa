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
import { Tag } from '../models';
import { TagsService } from '../services/http';
import { tagsResolver } from './tags.resolver';

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
      tags: tagsResolver,
    },
  },
];

describe('TagsResolver', () => {
  let harness: RouterTestingHarness;
  let tagsServiceSpy: jasmine.SpyObj<TagsService>;

  beforeEach(async () => {
    tagsServiceSpy = jasmine.createSpyObj('TagsService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [HomeStubComponent, InboxStubComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        provideMockStore({}),
        {
          provide: TagsService,
          useValue: tagsServiceSpy,
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
    const tags: Tag[] = [
      { id: 1, name: 'Tag 1' },
      { id: 2, name: 'Tag 2' },
    ];

    const stubResponse: PaginatedList<Tag> = {
      pageIndex: 0,
      pageSize: 10,
      count: tags.length,
      data: tags,
    };

    tagsServiceSpy.getAll.and.returnValue(of(stubResponse));

    await harness.navigateByUrl('/inbox');
    expect(TestBed.inject(Router).url).toEqual('/inbox');
  });
});
