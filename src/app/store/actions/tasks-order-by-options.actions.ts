import { createActionGroup, emptyProps } from "@ngrx/store";

export const TasksOrderByOptions = createActionGroup({
   source: 'Tasks Order By Options',
   events: {
    'Order By Due Date': emptyProps(),
    'Order By Priority': emptyProps(),
   },
});
