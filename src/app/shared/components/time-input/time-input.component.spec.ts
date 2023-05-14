import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TimeInputComponent } from './time-input.component';

describe('TimeInputComponent', () => {
  let component: TimeInputComponent;
  let fixture: ComponentFixture<TimeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, TimeInputComponent],
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
      spyOn(component.time, 'emit');
      component.timeControl.setValue('19 PM');
      component.handleAddTime();
      expect(component.time.emit).not.toHaveBeenCalled();
    });

    it('should emit the "change" event', () => {
      spyOn(component.time, 'emit');
      component.timeControl.setValue('9 PM');
      component.handleAddTime();
      expect(component.time.emit).toHaveBeenCalled();
    });
  });
});
