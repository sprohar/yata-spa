import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { DeleteUserConfirmationDialogComponent } from './delete-user-confirmation-dialog.component';

describe('DeleteUserConfirmationDialogComponent', () => {
  let component: DeleteUserConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteUserConfirmationDialogComponent>;
  let dialogRef: jasmine.SpyObj<
    MatDialogRef<DeleteUserConfirmationDialogComponent>
  >;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']);

    await TestBed.configureTestingModule({
      declarations: [DeleteUserConfirmationDialogComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteUserConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an empty string when the Cancel button is clicked', (done: DoneFn) => {
    dialogRef.afterClosed.and.returnValue(of(''));

    const host: Element = fixture.nativeElement!;
    const button: HTMLButtonElement = host.querySelector('#cancelButton')!;

    button.click();
    fixture.detectChanges();

    dialogRef.afterClosed().subscribe((value) => {
      expect(value).toEqual('');
      done();
    });
  });

  describe('#deleteButton', () => {
    it('should be disabled after init', () => {
      const host: Element = fixture.nativeElement!;
      const button = host.querySelector('#deleteButton')!;
      expect(button.getAttribute('disabled')).toBeDefined();
    });

    it('should be enabled when the input control is in a valid state', () => {
      const host: Element = fixture.nativeElement!;
      const button = host.querySelector('#deleteButton')!;
      const input: HTMLInputElement = host.querySelector(
        '[data-test="confirmationInput"]'
      )!;

      input.value = component.message;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.control.value).toEqual(component.message);
      expect(button.getAttribute('disabled')).toBeNull();
    });
  });

  describe('handleConfirm', () => {
    it('should return immediately when the input is not valid', () => {
      const host: Element = fixture.nativeElement!;
      const button: HTMLButtonElement = host.querySelector('#deleteButton')!;
      const input: HTMLInputElement = host.querySelector(
        '[data-test="confirmationInput"]'
      )!;

      input.value = component.message + 'nope';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      button.click();
      fixture.detectChanges();

      expect(dialogRef.close).not.toHaveBeenCalled();

      component.handleConfirm();

      expect(dialogRef.close).not.toHaveBeenCalled();
    });

    it('should return true to the caller of the dialog', () => {
      const host: Element = fixture.nativeElement!;
      const button: HTMLButtonElement = host.querySelector('#deleteButton')!;
      const input: HTMLInputElement = host.querySelector(
        '[data-test="confirmationInput"]'
      )!;

      input.value = component.message;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      button.click();
      fixture.detectChanges();

      expect(dialogRef.close).toHaveBeenCalledWith(true);
    });
  });
});
