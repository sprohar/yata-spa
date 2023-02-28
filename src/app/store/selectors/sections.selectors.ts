import { createSelector } from '@ngrx/store';
import {
  selectCurrentSectionId,
  selectSections,
} from '../reducers/sections.reducer';

export const selectCurrentSection = createSelector(
  selectCurrentSectionId,
  selectSections,
  (sectionId, sections) => sections.find((s) => s.id === sectionId)
);
