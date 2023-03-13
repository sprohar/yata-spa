import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Project } from '../../../models';

import { EditProjectDialogComponent } from './edit-project-dialog.component';

describe('EditProjectDialogComponent', () => {
  let component: EditProjectDialogComponent;
  let fixture: ComponentFixture<EditProjectDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<EditProjectDialogComponent>>;
  let project: Project = { id: 1, name: 'Project ' };
  let store: MockStore;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [EditProjectDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        provideMockStore(),
        {
          provide: MAT_DIALOG_DATA,
          useValue: project,
        },
        {
          provide: MatDialogRef,
          useValue: dialogRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProjectDialogComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
