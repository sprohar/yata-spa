import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskFabButtonComponent } from './create-task-fab-button.component';

describe('CreateTaskFabButtonComponent', () => {
  let component: CreateTaskFabButtonComponent;
  let fixture: ComponentFixture<CreateTaskFabButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateTaskFabButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskFabButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
