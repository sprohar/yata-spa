import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChronoComponent } from './chrono.component';

describe('ChronoComponent', () => {
  let component: ChronoComponent;
  let fixture: ComponentFixture<ChronoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChronoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ChronoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
