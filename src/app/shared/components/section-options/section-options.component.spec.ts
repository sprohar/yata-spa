import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Section } from '../../../models';
import { SectionOptionsActions } from '../../../store/actions';
import { AppState } from '../../../store/app.state';
import { initialAuthState } from '../../../store/reducers/auth.reducer';

import { SectionOptionsComponent } from './section-options.component';

class MatDialogRefStub {
  afterClosed() {
    return of(true);
  }
}

class MatDialogStub {
  open() {
    return new MatDialogRefStub();
  }
}

const initialState: AppState = {
  auth: initialAuthState,
  projects: {
    currentProjectId: 1,
    projects: [
      { id: 1, name: 'Project 1' },
      { id: 2, name: 'Project 2' },
    ],
  },
  sections: {
    currentSectionId: null,
    sections: [
      {
        id: 1,
        name: 'To-Do',
        projectId: 1,
      },
    ],
  },
  tasks: {
    orderBy: null,
    currentTaskId: null,
    tasks: [{ id: 1, title: 'Task', projectId: 1, sectionId: 1 }],
  },
};

describe('SectionOptionsComponent', () => {
  const section: Section = initialState.sections.sections[0];
  const currentProjectId = section.projectId;
  const targetProjectId = 2;
  let component: SectionOptionsComponent;
  let fixture: ComponentFixture<SectionOptionsComponent>;
  let matDialog = new MatDialogStub();
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatMenuModule, MatButtonModule, SectionOptionsComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: MatDialog,
          useValue: matDialog,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionOptionsComponent);
    store = TestBed.inject(MockStore);
  });

  describe('#ngOnInit', () => {
    it('should throw an error if "section" is undefined', () => {
      expect(() => {
        component = fixture.componentInstance;
        fixture.detectChanges();
      }).toThrowError();
    });

    it('should create', () => {
      component = fixture.componentInstance;
      component.section = section;
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });

  describe('#handleMoveToProject', () => {
    beforeEach(() => {
      component = fixture.componentInstance;
      component.section = section;
      fixture.detectChanges();
    });

    it('should dispatch an action to move the section to the provided project', () => {
      spyOn(store, 'dispatch');
      component.handleMoveToProject(targetProjectId);
      expect(store.dispatch).toHaveBeenCalledWith(
        SectionOptionsActions.moveToProject({
          sourceProjectId: currentProjectId,
          targetProjectId,
          section,
        })
      );
    });
  });

  describe('#handleEdit', () => {
    beforeEach(() => {
      component = fixture.componentInstance;
      component.section = section;
      fixture.detectChanges();
    });

    it('should open the EditSectionDialogComponent', () => {
      spyOn(matDialog, 'open');
      component.handleEdit();
      expect(matDialog.open).toHaveBeenCalled();
    });
  });

  describe('#handleDeleteColumn', () => {
    beforeEach(() => {
      component = fixture.componentInstance;
      component.section = section;
      fixture.detectChanges();
    });

    it('should dispatch the "deleteSection" action', () => {
      spyOn(store, 'dispatch');
      component.handleDelete();
      expect(store.dispatch).toHaveBeenCalledWith(
        SectionOptionsActions.deleteSection({
          section,
        })
      );
    });
  });
});
