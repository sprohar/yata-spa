import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutModule } from '@angular/cdk/layout';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Tag } from '../../models';
import { ConfirmationDialogService } from '../../services';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let confirmationDialog: jasmine.SpyObj<ConfirmationDialogService>;
  let store: MockStore;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    confirmationDialog = jasmine.createSpyObj('ConfirmationDialogService', [
      'open',
    ]);

    await TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      imports: [
        MatSidenavModule,
        LayoutModule,
        MatListModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        MatMenuModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      providers: [
        provideMockStore(),
        { provide: MatDialog, useValue: dialog },
        { provide: ConfirmationDialogService, useValue: confirmationDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog when the create tag button is clicked', () => {
    component.openCreateTagDialog();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should open the dialog when the create project button is clicked', () => {
    component.openCreateProjectDialog();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should open the dialog when the edit tag button is clicked', () => {
    const tag: Tag = { id: 1, name: 'tag', colorHexCode: '#000000' };
    component.openEditTagDialog(tag);
    expect(dialog.open).toHaveBeenCalled();
  });

  describe('openDeleteTagConfirmationDialog', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should open the confirmation dialog & dispatch an action when the user confirms', () => {
      const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      dialogRef.afterClosed.and.returnValue(of(true));
      confirmationDialog.open.and.returnValue(dialogRef);

      const tag: Tag = { id: 1, name: 'tag', colorHexCode: '#000000' };
      component.openDeleteTagConfirmationDialog(tag);

      expect(confirmationDialog.open).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalled();
    });

    it('should open the confirmation dialog, but NOT dispatch an action when the user does NOT confirm', () => {
      const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      dialogRef.afterClosed.and.returnValue(of(false));
      confirmationDialog.open.and.returnValue(dialogRef);

      const tag: Tag = { id: 1, name: 'tag', colorHexCode: '#000000' };
      component.openDeleteTagConfirmationDialog(tag);

      expect(confirmationDialog.open).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
