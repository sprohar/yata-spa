import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { Priority } from '../../../models';
import {
  CreateTaskDialogComponent,
  CreateTaskDialogData,
} from './create-task-dialog.component';

describe('CreateTaskDialogComponent', () => {
  let component: CreateTaskDialogComponent;
  let fixture: ComponentFixture<CreateTaskDialogComponent>;
  let dialogRef: MatDialogRef<CreateTaskDialogComponent>;
  let data: CreateTaskDialogData = {
    parent: null,
    section: {
      id: 1,
      name: 'Section 1',
      projectId: 1,
    },
    project: {
      id: 1,
      name: 'Project 1',
    },
    priority: Priority.HIGH,
  };

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        CreateTaskDialogComponent,
      ],
      providers: [
        provideMockStore(),
        {
          provide: MatDialogRef,
          useValue: dialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: data,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
