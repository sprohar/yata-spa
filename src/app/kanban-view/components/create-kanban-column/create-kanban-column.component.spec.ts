import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKanbanColumnComponent } from './create-kanban-column.component';

describe('CreateKanbanColumnComponent', () => {
  let component: CreateKanbanColumnComponent;
  let fixture: ComponentFixture<CreateKanbanColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateKanbanColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateKanbanColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
