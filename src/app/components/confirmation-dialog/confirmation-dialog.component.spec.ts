import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogData } from '../../interfaces/confirmation-dialog-data';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ConfirmationDialogComponent>>;
  let dialogData: ConfirmationDialogData = {
    title: 'Confirm action',
    message: 'Are you sure?',
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [NoopAnimationsModule, MatDialogModule, MatButtonModule, ConfirmationDialogComponent],
    providers: [
        {
            provide: MAT_DIALOG_DATA,
            useValue: dialogData,
        },
        {
            provide: MatDialogRef,
            useValue: mockDialogRef,
        },
    ]
}).compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have data', () => {
    expect(component.data).toBeDefined();
    expect(component.data).toEqual(dialogData);
  });

  describe('#handleConfirm', () => {
    it('should call close() on the dialogRef', () => {
      component.handleConfirm();
      expect(mockDialogRef.close).toHaveBeenCalled();
    });
  });
});
