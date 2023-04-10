import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskDetailsDailogComponent } from './subtask-details-dailog.component';

describe('SubtaskDetailsDailogComponent', () => {
  let component: SubtaskDetailsDailogComponent;
  let fixture: ComponentFixture<SubtaskDetailsDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtaskDetailsDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtaskDetailsDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
