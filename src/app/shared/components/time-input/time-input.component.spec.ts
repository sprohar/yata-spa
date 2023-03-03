import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TimeInputComponent } from './time-input.component';

describe('TimeInputComponent', () => {
  let component: TimeInputComponent;
  let fixture: ComponentFixture<TimeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeInputComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeInputComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleCancel', () => {
    it('should emit the "close" event', () => {
      spyOn(component.close, 'emit');
      component.handleCancel();
      expect(component.close.emit).toHaveBeenCalled();
    });
  });

  describe('#handleAddTime', () => {
    it('should NOT emit the "change" event when the form is invalid', () => {
      spyOn(component.change, 'emit');
      component.timeControl.setValue('19 PM');
      component.handleAddTime();
      expect(component.change.emit).not.toHaveBeenCalled();
    })
    
    it('should emit the "change" event', () => {
      spyOn(component.change, 'emit');
      component.timeControl.setValue('9 PM');
      component.handleAddTime();
      expect(component.change.emit).toHaveBeenCalled();
    })
  })
});
