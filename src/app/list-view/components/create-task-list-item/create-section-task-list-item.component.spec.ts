import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Section, Task } from '../../../models';
import { ListViewActions } from '../../../store/actions';

import { CreateSectionTaskListItem } from './create-section-task-list-item.component';

describe('CreateTaskListItemComponent', () => {
  let component: CreateSectionTaskListItem;
  let fixture: ComponentFixture<CreateSectionTaskListItem>;
  let store: MockStore;
  const section: Section = { id: 1, name: 'Section', projectId: 1 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSectionTaskListItem],
      imports: [ReactiveFormsModule, MatCheckboxModule, MatIconModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSectionTaskListItem);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.section = section;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#close', () => {
    it('should dispatch an action to close this component', () => {
      spyOn(store, 'dispatch');
      component.close();
      expect(store.dispatch).toHaveBeenCalledWith(
        ListViewActions.closeCreateSectionTaskListItem()
      );
    });
  });

  describe('#close', () => {
    it('should dispatch an action to close this component', () => {
      spyOn(store, 'dispatch');
      component.close();
      expect(store.dispatch).toHaveBeenCalledWith(
        ListViewActions.closeCreateSectionTaskListItem()
      );
    });
  });

  describe('#save', () => {
    it('should NOT dispatch an action to create a new task when the form is invalid', () => {
      spyOn(store, 'dispatch');

      component.save();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch an action to create a new task', () => {
      spyOn(store, 'dispatch');
      const task: Task = {
        title: 'Task',
        sectionId: section.id,
        projectId: section.projectId,
      };

      component.form.patchValue({
        title: task.title,
      });

      component.save();

      expect(store.dispatch).toHaveBeenCalledWith(
        ListViewActions.createTaskInSection({
          task,
        })
      );
    });
  });
});
