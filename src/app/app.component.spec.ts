import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { SidenavActions } from './store/actions';
import { AppState } from './store/app.state';

const initialState: AppState = {
  projects: {
    currentProjectId: 1,
    projects: [{ id: 1, name: 'Project' }],
  },
  sections: {
    currentSectionId: 1,
    sections: [{ id: 1, name: 'Section', projectId: 1 }],
  },
  tasks: {
    currentTaskId: null,
    tasks: [{ id: 1, title: 'Task', sectionId: 1, projectId: 1 }],
  },
};

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        NoopAnimationsModule,
      ],
      declarations: [AppComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: MatDialog,
          useValue: dialog,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    spyOn(store, 'dispatch');
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(SidenavActions.onInit());
  });

  describe('#openAddProjectDialog', () => {
    it('should call "open" on the instance of MatDialog', () => {
      component.openAddProjectDialog();
      expect(dialog.open).toHaveBeenCalled();
    });
  });
});
