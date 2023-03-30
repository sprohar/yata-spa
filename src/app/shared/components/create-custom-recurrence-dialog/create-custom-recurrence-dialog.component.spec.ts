import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomRecurrenceDialogComponent } from './create-custom-recurrence-dialog.component';

describe('CreateCustomRecurrenceDialogComponent', () => {
  let component: CreateCustomRecurrenceDialogComponent;
  let fixture: ComponentFixture<CreateCustomRecurrenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCustomRecurrenceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCustomRecurrenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
