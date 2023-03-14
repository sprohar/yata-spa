import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixTaskListComponent } from './matrix-task-list.component';

describe('MatrixTaskListComponent', () => {
  let component: MatrixTaskListComponent;
  let fixture: ComponentFixture<MatrixTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixTaskListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
