import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Section } from '../../../models';
import { SectionOptionsMenuActions } from '../../../store/actions';

import { SectionOptionsMenuComponent } from './section-options-menu.component';

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

describe('SectionOptionsMenuComponent', () => {
  let component: SectionOptionsMenuComponent;
  let fixture: ComponentFixture<SectionOptionsMenuComponent>;
  let matDialog = new MatDialogStub();
  let store: MockStore;
  const section: Section = {
    id: 1,
    name: 'To-Do',
    projectId: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionOptionsMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [],
      providers: [
        provideMockStore(),
        {
          provide: MatDialog,
          useValue: matDialog,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionOptionsMenuComponent);
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
        SectionOptionsMenuActions.deleteSection({
          section,
        })
      );
    });
  });
});
