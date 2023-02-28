import { createFeature, createReducer, on } from '@ngrx/store';
import { Section } from '../../models';
import { YataApiActions } from '../actions';

export interface SectionsState {
  sections: Section[];
  currentSectionId: number | null;
}

const initialState: SectionsState = {
  sections: [],
  currentSectionId: null,
};

export const sectionsFeature = createFeature({
  name: 'sections',
  reducer: createReducer(
    initialState,
    on(YataApiActions.createSectionSuccess, (state, action) => ({
      currentSectionId: state.currentSectionId,
      sections: state.sections.concat(action.section),
    })),
    on(YataApiActions.loadProjectSuccess, (state, action) => ({
      currentSectionId: state.currentSectionId,
      sections: action.project.sections ?? [],
    }))
  ),
});

export const {
  name,
  reducer,
  selectCurrentSectionId,
  selectSections,
  selectSectionsState,
} = sectionsFeature;
