import { ListViewActions, YataApiActions } from '../actions';
import * as fromSections from './sections.reducer';

describe('SectionsReducer', () => {
  describe('ListViewActions.openCreateSectionTaskListItem', () => {
    it('should set currentSectionId to the sectionId passed in', () => {
      const { initialSectionsState } = fromSections;
      const action = ListViewActions.openCreateSectionTaskListItem({
        sectionId: 1,
      });

      const state = fromSections.reducer(initialSectionsState, action);
      expect(state.currentSectionId).toEqual(1);
    });
  });

  describe('ListViewActions.closeCreateSectionTaskListItem', () => {
    it('should set currentSectionId to the sectionId passed in', () => {
      const { initialSectionsState } = fromSections;
      const action = ListViewActions.closeCreateSectionTaskListItem();
      const state = fromSections.reducer(initialSectionsState, action);
      expect(state.currentSectionId).toBeNull();
    });
  });

  describe('YataApiActions.createSectionSuccess', () => {
    it('should add the new section to the sections array', () => {
      const { initialSectionsState } = fromSections;
      const action = YataApiActions.createSectionSuccess({
        section: { id: 1, projectId: 1, name: 'Section 1', tasks: [] },
      });

      const state = fromSections.reducer(initialSectionsState, action);
      expect(state.sections.length).toEqual(1);
    });
  });

  describe('YataApiActions.deleteSectionSuccess', () => {
    it('should remove the section from the sections array', () => {
      const initialState: fromSections.SectionsState = {
        ...fromSections.initialSectionsState,
        sections: [{ id: 1, projectId: 1, name: 'Section 1', tasks: [] }],
      };

      const action = YataApiActions.deleteSectionSuccess({
        section: { id: 1, projectId: 1, name: 'Section 1', tasks: [] },
      });

      const state = fromSections.reducer(initialState, action);
      expect(state.sections.length).toEqual(0);
    });
  });

  describe('YataApiActions.loadProjectSuccess', () => {
    it('should set the sections array to the sections from the project', () => {
      const { initialSectionsState } = fromSections;
      const action = YataApiActions.loadProjectSuccess({
        project: {
          id: 1,
          name: 'Project 1',
          sections: [{ id: 1, projectId: 1, name: 'Section 1', tasks: [] }],
        },
      });

      const state = fromSections.reducer(initialSectionsState, action);
      expect(state.sections.length).toEqual(1);
    });
  });

  describe('YataApiActions.moveSectionToProjectSuccess', () => {
    it('should remove the section from the sections array', () => {
      const initialState: fromSections.SectionsState = {
        ...fromSections.initialSectionsState,
        sections: [{ id: 1, projectId: 1, name: 'Section 1', tasks: [] }],
      };

      const action = YataApiActions.moveSectionToProjectSuccess({
        section: { id: 1, projectId: 1, name: 'Section 1', tasks: [] },
      });

      const state = fromSections.reducer(initialState, action);
      expect(state.sections.length).toEqual(0);
    });
  });

  describe('YataApiActions.updateSectionSuccess', () => {
    it('should update the section in the sections array', () => {
      const initialState: fromSections.SectionsState = {
        ...fromSections.initialSectionsState,
        sections: [{ id: 1, projectId: 1, name: 'Section 1', tasks: [] }],
      };

      const action = YataApiActions.updateSectionSuccess({
        section: { id: 1, projectId: 1, name: 'Section 1', tasks: [] },
      });

      const state = fromSections.reducer(initialState, action);
      expect(state.sections.length).toEqual(1);
    });
  });
});
