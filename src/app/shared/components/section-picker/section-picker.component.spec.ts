import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Section } from '../../../models';
import { AppState } from '../../../store/app.state';
import { initialAuthState } from '../../../store/reducers/auth.reducer';

import { SectionPickerComponent } from './section-picker.component';

const initialState: AppState = {
  auth: initialAuthState,
  projects: {
    currentProjectId: 1,
    projects: [{ id: 1, name: 'Project' }],
  },
  sections: {
    currentSectionId: null,
    sections: [{ id: 1, name: 'Section', projectId: 1 }],
  },
  tasks: {
    orderBy: null,
    currentTaskId: null,
    tasks: [{ id: 1, title: 'Task', projectId: 1, sectionId: 1 }],
  },
};

describe('SectionPickerComponent', () => {
  let component: SectionPickerComponent;
  let fixture: ComponentFixture<SectionPickerComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        NoopAnimationsModule,
        SectionPickerComponent,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionPickerComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleSelected', () => {
    it('should emit the selected section', () => {
      spyOn(component.selected, 'emit');
      const section: Section = initialState.sections.sections[0];

      component.handleSelected(section);

      expect(component.selected.emit).toHaveBeenCalledWith(section);
    });
  });
});
