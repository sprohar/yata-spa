import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Tag, Task } from '../../../models';
import { TaskDetailsActions } from '../../../store/actions';
import { TagsSelectListDialogComponent } from './tags-select-list-dialog.component';

describe('TagsSelectListDialogComponent', () => {
  let component: TagsSelectListDialogComponent;
  let fixture: ComponentFixture<TagsSelectListDialogComponent>;
  let dialogRef: MatDialogRef<TagsSelectListDialogComponent>;
  let store: MockStore;
  const task: Task = {
    id: 1,
    title: 'Task 1',
    projectId: 1,
  };

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, TagsSelectListDialogComponent],
      providers: [
        provideMockStore(),
        {
          provide: MatDialogRef,
          useValue: dialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: task,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsSelectListDialogComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleCreateTag', () => {
    it('should NOT dispatch a create tag action if the form is invalid', () => {
      spyOn(store, 'dispatch');
      component.handleCreateTag();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch a create tag action', () => {
      spyOn(store, 'dispatch');

      const name = 'Tag 1';
      component.nameControl.setValue(name);
      component.handleCreateTag();

      expect(store.dispatch).toHaveBeenCalledWith(
        TaskDetailsActions.createTag({
          tag: {
            name,
          } as Tag,
        })
      );
    });
  });

  describe('#handleSubmit', () => {
    it('should NOT dispatch a create tag action if the form is invalid', () => {
      spyOn(store, 'dispatch');
      component.handleSubmit();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch the updateTask action to associate the selected tags with the given task id', () => {
      spyOn(store, 'dispatch');

      const selectedTagIds = [1, 2];
      component.form.patchValue({
        tags: selectedTagIds,
      });

      component.handleSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(
        TaskDetailsActions.updateTask({
          task: {
            id: task.id,
            tags: selectedTagIds.map((id) => ({ id } as Tag)),
          },
        })
      );
    });
  });
});
