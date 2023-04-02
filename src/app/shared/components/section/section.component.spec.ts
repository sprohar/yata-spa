import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SectionComponent } from './section.component';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionComponent],
      imports: [MatButtonModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a name', () => {
    component.name = 'Test';
    expect(component.name).toBeTruthy();
  });

  it('should have an items count', () => {
    component.itemsCount = 1;
    expect(component.itemsCount).toBeTruthy();
  });

  it('should have an expanded state', () => {
    expect(component.expanded).toBeTruthy();
  });

  it('should toggle expanded state', () => {
    component.toggleExpanded();
    expect(component.expanded).toBeFalsy();
  });

  it('should have a toggle button', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.clickable')).toBeTruthy();
  });
});
