import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Section } from '../../../models';
import { KanbanViewActions } from '../../../store/actions';
import { AppState } from '../../../store/app.state';
import { initialTasksState } from '../../../store/reducers/tasks.reducer';

import { EditSectionDialogComponent } from './edit-section-dialog.component';

const initialState: AppState = {
  projects: {
    currentProjectId: 1,
    projects: [{ id: 1, name: 'Project' }],
  },
  sections: {
    currentSectionId: 1,
    sections: [{ id: 1, name: 'Section', projectId: 1 }],
  },
  tasks: initialTasksState,
};

describe('EditSectionDialogComponent', () => {
  let component: EditSectionDialogComponent;
  let fixture: ComponentFixture<EditSectionDialogComponent>;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<EditSectionDialogComponent>>;
  let section: Section;
  let store: MockStore;

  beforeEach(async () => {
    section = initialState.sections.sections[0];
    matDialogRef = jasmine.createSpyObj('MatDialogRef', {
      close: () => {},
    });

    await TestBed.configureTestingModule({
      declarations: [EditSectionDialogComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: matDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditSectionDialogComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.form.get('name')?.value).toBe(section.name);
  });

  it('should dispatch the "close" action when the component is destroyed', () => {
    spyOn(store, 'dispatch');
    component.ngOnDestroy();
    expect(store.dispatch).toHaveBeenCalledWith(
      KanbanViewActions.closeEditSectionDialog()
    );
  });

  describe('#handleSave', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should NOT dispatch an action when the form is invalid', () => {
      component.handleSave(section);
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch the "updateSection" action', () => {
      component.nameControl.setValue('Updated Section Name');
      component.nameControl.markAsDirty();
      component.handleSave(section);

      expect(matDialogRef.close).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        KanbanViewActions.updateSection({
          section: {
            ...section,
            name: component.nameControl.value
          },
        })
      );
    });
  });
});
