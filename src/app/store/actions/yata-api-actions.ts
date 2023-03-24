import { createActionGroup, props } from '@ngrx/store';
import { ApiErrorResponse } from '../../interfaces/api-error-response';
import { Project, Section, Subtask, Tag, Task } from '../../models';

export const YataApiActions = createActionGroup({
  source: 'Yata API',
  events: {
    // Projects
    'Create Project Success': props<{ project: Project }>(),
    'Create Project Error': props<{ error: ApiErrorResponse }>(),
    'Delete Project Success': props<{ project: Project }>(),
    'Delete Project Error': props<{ error: ApiErrorResponse }>(),
    'Load Projects Success': props<{ projects: Project[] }>(),
    'Load Projects Error': props<{ error: ApiErrorResponse }>(),
    'Load Project Success': props<{ project: Project }>(),
    'Load Project Error': props<{ error: ApiErrorResponse }>(),
    'Update Project Success': props<{ project: Project }>(),
    'Update Project Error': props<{ error: ApiErrorResponse }>(),
    // Sections
    'Create Section Success': props<{ section: Section }>(),
    'Create Section Error': props<{ error: ApiErrorResponse }>(),
    'Delete Section Success': props<{ section: Section }>(),
    'Delete Section Error': props<{ error: ApiErrorResponse }>(),
    'Load Section Success': props<{ sectionId: number }>(),
    'Load Section Error': props<{ error: ApiErrorResponse }>(),
    'Update Section Success': props<{ section: Section }>(),
    'Update Section Error': props<{ error: ApiErrorResponse }>(),
    'Move Section To Project Success': props<{ section: Section }>(),
    'Move Section To Project Error': props<{ error: ApiErrorResponse }>(),
    // Tasks
    'Create Task Success': props<{ task: Task }>(),
    'Create Task Error': props<{ error: ApiErrorResponse }>(),
    'Delete Task Success': props<{ task: Task }>(),
    'Delete Task Error': props<{ error: ApiErrorResponse }>(),
    'Load Task Success': props<{ task: Task }>(),
    'Load Task Error': props<{ error: ApiErrorResponse }>(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Error': props<{ error: ApiErrorResponse }>(),
    'Update Task Success': props<{ task: Task }>(),
    'Update Task Error': props<{ error: ApiErrorResponse }>(),
    'Move Task To Project Success': props<{ task: Task }>(),
    'Move Task To Project Error': props<{ error: ApiErrorResponse }>(),
    'Mark Task As Complete Success': props<{ task: Task }>(),
    'Mark Task As Complete Error': props<{ error: ApiErrorResponse }>(),
    'Mark Task As Incomplete Success': props<{ task: Task }>(),
    'Mark Task As Incomplete Error': props<{ error: ApiErrorResponse }>(),
    // Subtasks
    'Create Subtask Success': props<{ subtask: Subtask }>(),
    'Create Subtask Error': props<{ error: ApiErrorResponse }>(),
    'Delete Subtask Success': props<{ subtask: Subtask }>(),
    'Delete Subtask Error': props<{ error: ApiErrorResponse }>(),
    'Load Subtask Success': props<{ subtask: Subtask }>(),
    'Load Subtask Error': props<{ error: ApiErrorResponse }>(),
    'Update Subtask Success': props<{ subtask: Subtask }>(),
    'Update Subtask Error': props<{ error: ApiErrorResponse }>(),
    // Tags
    'Create Tag Success': props<{ tag: Tag }>(),
    'Create Tag Error': props<{ error: ApiErrorResponse }>(),
    'Load Tags Success': props<{ tags: Tag[] }>(),
    'Load Tags Error': props<{ error: ApiErrorResponse }>(),
    'Update Tag Success': props<{ tag: Tag }>(),
    'Update Tag Error': props<{ error: ApiErrorResponse }>(),
  },
});
