import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ProjectSectionComponent } from './project-section.component';

describe('ProjectSectionComponent', () => {
  let component: ProjectSectionComponent;
  let fixture: ComponentFixture<ProjectSectionComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectSectionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatButtonModule, MatIconModule],
      providers: [
        provideMockStore(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectSectionComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.section = { id: 1, name: 'Name', projectId: 1 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleAddTask', () => {
    it('should dispatch an action to open the create-section-task-list-item component', () => {
      spyOn(store, 'dispatch');
      component.handleAddTask();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
