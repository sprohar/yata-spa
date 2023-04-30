import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { provideMockStore } from '@ngrx/store/testing';
import { TagsState } from '../../store/reducers/tags.reducer';
import { TagsComponent } from './tags.component';

const tagsState: TagsState = {
  currentTagId: null,
  tags: [
    {
      id: 1,
      name: 'Tag 1',
    },
    {
      id: 2,
      name: 'Tag 2',
    },
  ],
};

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatExpansionModule],
      providers: [
        provideMockStore({
          initialState: {
            tags: tagsState,
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
