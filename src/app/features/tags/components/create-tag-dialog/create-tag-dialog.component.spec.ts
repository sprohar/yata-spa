import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { CreateTagDialogComponent } from './create-tag-dialog.component';

describe('CreateTagDialogComponent', () => {
  let component: CreateTagDialogComponent;
  let fixture: ComponentFixture<CreateTagDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<CreateTagDialogComponent>>;
  let store: MockStore;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [CreateTagDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideMockStore(),
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTagDialogComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with 2 controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('colorHexCode')).toBeTruthy();
  });

  it('should make the name control required', () => {
    const control = component.form.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the name control have a max length of 50', () => {
    const control = component.form.get('name');
    control?.setValue('a'.repeat(Tag.Name.MaxLength + 1));
    expect(control?.valid).toBeFalsy();
  });

  it('should make the colorHexCode control have a max length of 8', () => {
    const control = component.form.get('colorHexCode');
    control?.setValue('a'.repeat(Tag.ColorHexCode.MaxLength + 1));
    expect(control?.valid).toBeFalsy();
  });

  describe('handleCreate', () => {
    it('should not emit an event when the form is invalid', () => {
      component.form.get('name')?.setValue('');
      component.handleCreate();

      expect(dialogRef.close).not.toHaveBeenCalled();
    });

    it('should emit an event when the form is submitted', () => {
      spyOn(store, 'dispatch');

      component.form.get('name')?.setValue('test');
      component.handleCreate();

      expect(store.dispatch).toHaveBeenCalled();
      expect(dialogRef.close).toHaveBeenCalled();
    });
  });
});
