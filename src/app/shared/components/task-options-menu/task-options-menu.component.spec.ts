import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TaskOptionsMenuComponent } from './task-options-menu.component';

describe('TaskOptionsMenuComponent', () => {
  let component: TaskOptionsMenuComponent;
  let fixture: ComponentFixture<TaskOptionsMenuComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let store: MockStore;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [TaskOptionsMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatDialogModule, MatMenuModule, MatButtonModule, MatIconModule],
      providers: [
        provideMockStore(),
        {
          provide: MatDialog,
          useValue: dialog,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskOptionsMenuComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
