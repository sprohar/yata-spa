import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Section } from '../../../models';
import { EditSectionDialogActions } from '../../../store/actions';

import { EditSectionDialogComponent } from './edit-section-dialog.component';

describe('EditSectionDialogComponent', () => {
  let component: EditSectionDialogComponent;
  let fixture: ComponentFixture<EditSectionDialogComponent>;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<EditSectionDialogComponent>>;
  let section: Section = { id: 1, name: 'Section', projectId: 1 };
  let store: MockStore;

  beforeEach(async () => {
    matDialogRef = jasmine.createSpyObj('MatDialogRef', {
      close: () => {},
    });

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        EditSectionDialogComponent,
      ],
      providers: [
        provideMockStore(),
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: matDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditSectionDialogComponent);
    store = TestBed.inject(MockStore);
  });

  describe('ngOnInit', () => {
    it('should throw an error when no Section data is supplied to the component', () => {
      expect(() => {
        component = fixture.componentInstance;
        fixture.detectChanges();
      }).toThrowError();
    });

    it('should create', () => {
      component = fixture.componentInstance;
      component.data = section;
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });
  });

  describe('#handleSave', () => {
    beforeEach(() => {
      component = fixture.componentInstance;
      component.data = section;
      fixture.detectChanges();
    });

    it('should NOT dispatch an action when the form is pristine', () => {
      spyOn(store, 'dispatch');
      component.handleSave();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should NOT dispatch an action when the form is invalid', () => {
      spyOn(store, 'dispatch');
      component.nameControl.setValue(' '.repeat(Section.Name.MaxLength + 1));
      component.nameControl.markAsDirty();
      component.handleSave();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch the "updateSection" action', () => {
      spyOn(store, 'dispatch');
      component.nameControl.setValue('Updated Section Name');
      component.nameControl.markAsDirty();
      component.handleSave();

      expect(matDialogRef.close).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        EditSectionDialogActions.updateSection({
          section: {
            ...section,
            name: component.nameControl.value,
          },
        })
      );
    });
  });
});
