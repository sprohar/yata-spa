import { createFeature, createReducer, on } from '@ngrx/store';
import { Section } from '../../models';
import { YataApiActions } from '../actions';

export interface SectionsState {
  sections: Section[];
  currentSectionId: number | null;
}

export const sectionsInitialState: SectionsState = {
  sections: [],
  currentSectionId: null,
};

export const sectionsFeature = createFeature({
  name: 'sections',
  reducer: createReducer(
    sectionsInitialState,
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
