import { createFeature, createReducer, on } from '@ngrx/store';
import { Section } from '../../models';
import { ListViewActions, YataApiActions } from '../actions';

export interface SectionsState {
  sections: Section[];
  currentSectionId: number | null;
}

export const initialSectionsState: SectionsState = {
  sections: [],
  currentSectionId: null,
};

export const sectionsFeature = createFeature({
  name: 'sections',
  reducer: createReducer(
    initialSectionsState,
    on(ListViewActions.openCreateSectionTaskListItem, (state, action) => ({
      sections: state.sections,
      currentSectionId: action.sectionId,
    })),
    on(ListViewActions.closeCreateSectionTaskListItem, (state, _) => ({
      sections: state.sections,
      currentSectionId: null,
    })),
    on(YataApiActions.createSectionSuccess, (state, action) => ({
      currentSectionId: state.currentSectionId,
      sections: state.sections.concat(action.section),
    })),
    on(YataApiActions.deleteSectionSuccess, (state, action) => ({
      currentSectionId: state.currentSectionId,
      sections: state.sections.filter((s) => s.id !== action.section.id),
    })),
    on(YataApiActions.loadProjectSuccess, (state, action) => ({
      currentSectionId: state.currentSectionId,
      sections: action.project.sections ?? [],
    })),
    on(YataApiActions.moveSectionToProjectSuccess, (state, action) => ({
      currentSectionId: state.currentSectionId,
      sections: state.sections.filter(
        (section) => section.id !== action.section.id
      ),
    })),
    on(YataApiActions.updateSectionSuccess, (state, action) => {
      const sections: Section[] = [];
      for (const section of state.sections) {
        if (section.id === action.section.id) {
          sections.push(action.section);
        } else {
          sections.push(section);
        }
      }

      return {
        currentSectionId: state.currentSectionId,
        sections,
      };
    })
  ),
});

export const {
  name,
  reducer,
  selectCurrentSectionId,
  selectSections,
  selectSectionsState,
} = sectionsFeature;
