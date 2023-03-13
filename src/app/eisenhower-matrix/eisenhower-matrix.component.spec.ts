import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EisenhowerMatrixComponent } from './eisenhower-matrix.component';

describe('EisenhowerMatrixComponent', () => {
  let component: EisenhowerMatrixComponent;
  let fixture: ComponentFixture<EisenhowerMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EisenhowerMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EisenhowerMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
