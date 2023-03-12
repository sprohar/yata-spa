import { createActionGroup, emptyProps } from "@ngrx/store";

export const TaskListSortOptionsActions = createActionGroup({
   source: 'Task List Sort Options',
   events: {
    'Sort By Created At': emptyProps(),
   },
});
