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
import { Tag } from '../../../../models';
import { EditTagDialogComponent } from './edit-tag-dialog.component';

describe('EditTagDialogComponent', () => {
  let component: EditTagDialogComponent;
  let fixture: ComponentFixture<EditTagDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<EditTagDialogComponent>>;
  let store: MockStore;
  const tag: Tag = {
    id: 1,
    name: 'Tag 1',
    colorHexCode: '#000000',
  };

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [EditTagDialogComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      providers: [
        provideMockStore(),
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: tag },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTagDialogComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    expect(component.form).toBeTruthy();
  });

  it('should have a form with the correct initial values', () => {
    expect(component.form.value).toEqual(tag);
  });

  it('should close dialog on cancel', () => {
    const button = fixture.nativeElement.querySelector(
      '[data-test="editTagDialogCancelButton"]'
    );
    button.click();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  describe('#clearColorInput', () => {
    it('should clear the colorHexCode field', () => {
      component.form.get('colorHexCode')?.setValue('#ffffff');
      component.clearColorInput();
      expect(component.form.value.colorHexCode).toBeNull();
    });
  });

  describe('#handleSave', () => {
    it('should not call the store if the form is invalid', () => {
      const spy = spyOn(store, 'dispatch');
      component.form.get('name')?.setValue('');
      component.handleSave();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not call the store if the form is pristine', () => {
      const spy = spyOn(store, 'dispatch');
      component.handleSave();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should call the store if the form is valid and dirty', () => {
      const spy = spyOn(store, 'dispatch');
      component.form.get('name')?.setValue('New Name');
      component.form.get('colorHexCode')?.setValue('#ffffff');
      component.form.markAsDirty();
      component.handleSave();
      expect(spy).toHaveBeenCalled();
      expect(dialogRef.close).toHaveBeenCalled();
    });
  });
});
