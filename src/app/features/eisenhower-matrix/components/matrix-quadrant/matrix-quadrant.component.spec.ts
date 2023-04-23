import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatrixQuadrantComponent } from './matrix-quadrant.component';

describe('MatrixQuadrantComponent', () => {
  let component: MatrixQuadrantComponent;
  let fixture: ComponentFixture<MatrixQuadrantComponent>;
  let store: MockStore;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    
    await TestBed.configureTestingModule({
      declarations: [MatrixQuadrantComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
      ],
      providers: [provideMockStore(), {
        provide: MatDialog,
        useValue: dialog,
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(MatrixQuadrantComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
