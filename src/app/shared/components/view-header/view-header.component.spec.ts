import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ProjectsState } from '../../../store/reducers/projects.reducer';
import { ViewHeaderComponent } from './view-header.component';

describe('ViewHeaderComponent', () => {
  let component: ViewHeaderComponent;
  let fixture: ComponentFixture<ViewHeaderComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewHeaderComponent],
      imports: [MatButtonModule, MatMenuModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: [] },
        provideMockStore<ProjectsState>({
          initialState: {
            currentProjectId: 1,
            projects: [{ id: 1, name: 'Project' }],
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewHeaderComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
