import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { User } from '../../../../auth/models/user.model';
import { selectUser } from '../../../../store/reducers/auth.reducer';

import { EditUsernameInputComponent } from './edit-username-input.component';

describe('EditUsernameInputComponent', () => {
  let component: EditUsernameInputComponent;
  let fixture: ComponentFixture<EditUsernameInputComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUsernameInputComponent],
      imports: [MatButtonModule, MatIconModule, ReactiveFormsModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUsernameInputComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the form control value with an empty string when the user has no username', () => {
    expect(component.control.value).toEqual('');
  });

  it("should set the form control value with the user's username", () => {
    store.overrideSelector(selectUser, { username: 'username' } as User);
    store.refreshState();
    fixture.detectChanges();
    expect(component.control.value).toEqual('username');
  });

  it('should emit the "close" event', () => {
    spyOn(component.close, 'emit');

    const host: Element = fixture.nativeElement!;
    const button: HTMLButtonElement = host.querySelector('button')!;
    button.click();

    fixture.detectChanges();

    expect(component.close.emit).toHaveBeenCalled();
  });

  describe('handleSubmit', () => {
    it('should NOT dispatch an event when the control is invalid', () => {
      spyOn(store, 'dispatch');

      component.control.setValue('');
      fixture.detectChanges();

      const host: Element = fixture.nativeElement!;
      const input: HTMLInputElement = host.querySelector('input')!;
      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
        })
      );
      fixture.detectChanges();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch the "updateUser" action via "keydown.enter"', () => {
      spyOn(store, 'dispatch');

      const host: Element = fixture.nativeElement!;
      const input: HTMLInputElement = host.querySelector('input')!;

      input.value = 'username';
      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
        })
      );
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
