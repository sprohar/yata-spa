import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
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
      declarations: [CreateProjectDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, MatDialogModule, MatButtonModule],
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
      ],
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
    it('should NOT dispatch the "createProject" action when the form is invalid', () => {
      spyOn(store, 'dispatch');
      component.handleSave();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch the "createProject" action', () => {
      spyOn(store, 'dispatch');
      component.nameControl.setValue('My Test Project');
      component.handleSave();
      expect(store.dispatch).toHaveBeenCalledOnceWith(
        SidenavActions.createProject({
          project: component.form.value,
        })
      );
    });
  });
});
