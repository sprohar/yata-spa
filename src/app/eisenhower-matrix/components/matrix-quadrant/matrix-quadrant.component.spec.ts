import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixQuadrantComponent } from './matrix-quadrant.component';

describe('MatrixQuadrantComponent', () => {
  let component: MatrixQuadrantComponent;
  let fixture: ComponentFixture<MatrixQuadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixQuadrantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixQuadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
