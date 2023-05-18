import { ComponentFixture, TestBed } from '@angular/core/testing';

import { importProvidersFrom } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { CreateTaskFabButtonComponent } from './create-task-fab-button.component';
import { of } from 'rxjs';

describe('CreateTaskFabButtonComponent', () => {
  let component: CreateTaskFabButtonComponent;
  let fixture: ComponentFixture<CreateTaskFabButtonComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  const project = { id: '1', name: 'Project 1' };

  beforeEach(async () => {
    dialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [CreateTaskFabButtonComponent],
      providers: [
        importProvidersFrom(MatDialogModule),
        { provide: MatDialog, useValue: dialog },
        provideMockStore({
          initialState: {
            projects: {
              currentProjectId: project.id,
              projects: [project],
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTaskFabButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the CreateTaskDialog component when the user clicks the button', () => {
    const openDialogSpy = spyOn(component, 'openDialog');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(openDialogSpy).toHaveBeenCalled();
  });

  it('should pass the current project to the dialog component', () => {
    dialog.open.and.returnValue({ afterClosed: () => of() } as any);
    component.openDialog();
    expect(dialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: { project },
    });
  });
});
