import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Project } from '../../../models';
import { ViewHeaderActions } from '../../../store/actions';

import { CreateSectionDialogComponent } from './create-section-dialog.component';

describe('CreateSectionDialogComponent', () => {
  let component: CreateSectionDialogComponent;
  let fixture: ComponentFixture<CreateSectionDialogComponent>;
  let project: Project = { id: 1, name: 'Project ' };
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        CreateSectionDialogComponent,
      ],
      providers: [
        provideMockStore(),
        {
          provide: MAT_DIALOG_DATA,
          useValue: null,
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSectionDialogComponent);
    store = TestBed.inject(MockStore);
  });

  describe('#ngOnInit', () => {
    it('should throw an error when a Project is not supplied via DI', () => {
      expect(() => {
        component = fixture.componentInstance;
        fixture.detectChanges();
      }).toThrowError();
    });

    it('should create', () => {
      component = fixture.componentInstance;
      component.data = project;
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });

  describe('#handleCreate', () => {
    beforeEach(() => {
      component = fixture.componentInstance;
      component.data = project;
      fixture.detectChanges();
    });

    it('should NOT dispatch an action when the form is invalid', () => {
      spyOn(store, 'dispatch');
      component.handleCreateSection();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch an action to create a Section', () => {
      spyOn(store, 'dispatch');
      component.form.patchValue({
        name: 'Section Name',
      });

      component.handleCreateSection();

      expect(store.dispatch).toHaveBeenCalledWith(
        ViewHeaderActions.createSection({
          section: component.form.value,
        })
      );
    });
  });
});
