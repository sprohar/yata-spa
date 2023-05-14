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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Project } from '../../models';
import { SidenavActions } from '../../store/actions';

import { CreateProjectDialogComponent } from './create-project-dialog.component';

describe('CreateProjectDialogComponent', () => {
  let component: CreateProjectDialogComponent;
  let fixture: ComponentFixture<CreateProjectDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<CreateProjectDialogComponent>>;
  let store: MockStore;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        MatSelectModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        CreateProjectDialogComponent
    ],
    providers: [
        provideMockStore(),
        {
            provide: MAT_DIALOG_DATA,
            useValue: {},
        },
        {
            provide: MatDialogRef,
            useValue: dialogRef,
        },
    ]
}).compileComponents();

    fixture = TestBed.createComponent(CreateProjectDialogComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleSave', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should NOT dispatch the "createProject" action when the form is invalid', () => {
      component.handleSave();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch the "createProject" action', () => {
      component.form.patchValue({
        name: 'Project',
        view: Project.View.LIST,
      });

      component.handleSave();

      expect(store.dispatch).toHaveBeenCalledOnceWith(
        SidenavActions.createProject({
          project: component.form.value,
        })
      );
    });
  });
});
