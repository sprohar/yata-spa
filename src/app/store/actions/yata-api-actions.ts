import { createActionGroup, props } from '@ngrx/store';
import { Project, Section, Subtask, Task } from '../../models';
import { ServiceErrorResponse } from '../types';

export const YataApiActions = createActionGroup({
  source: 'Yata API',
  events: {
    // Projects
    'Create Project Success': props<{ project: Project }>(),
    'Create Project Error': props<ServiceErrorResponse>(),
    'Delete Project Success': props<{ project: Project }>(),
    'Delete Project Error': props<ServiceErrorResponse>(),
    'Load Projects Success': props<{ projects: Project[] }>(),
    'Load Projects Error': props<ServiceErrorResponse>(),
    'Load Project Success': props<{ project: Project }>(),
    'Load Project Error': props<ServiceErrorResponse>(),
    'Update Project Success': props<{ project: Project }>(),
    'Update Project Error': props<ServiceErrorResponse>(),
    // Sections
    'Create Section Success': props<{ section: Section }>(),
    'Create Section Error': props<ServiceErrorResponse>(),
    'Delete Section Success': props<{ section: Section }>(),
    'Delete Section Error': props<ServiceErrorResponse>(),
    'Load Section Success': props<{ sectionId: number }>(),
    'Load Section Error': props<ServiceErrorResponse>(),
    'Update Section Success': props<{ section: Section }>(),
    'Update Section Error': props<ServiceErrorResponse>(),
    // Tasks
    'Create Task Success': props<{ task: Task }>(),
    'Create Task Error': props<ServiceErrorResponse>(),
    'Delete Task Success': props<{ task: Task }>(),
    'Delete Task Error': props<ServiceErrorResponse>(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Error': props<ServiceErrorResponse>(),
    'Update Task Success': props<{ task: Task }>(),
    'Update Task Error': props<ServiceErrorResponse>(),
    'Move Task To Project Success': props<{ task: Task }>(),
    'Move Task To Project Error': props<ServiceErrorResponse>(),
    'Mark Task As Complete Success': props<{ task: Task }>(),
    'Mark Task As Complete Error': props<ServiceErrorResponse>(),
    'Mark Task As Incomplete Success': props<{ task: Task }>(),
    'Mark Task As Incomplete Error': props<ServiceErrorResponse>(),
    // Subtasks
    'Create Subtask Success': props<{ subtask: Subtask }>(),
    'Create Subtask Error': props<ServiceErrorResponse>(),
    'Delete Subtask Success': props<{ subtask: Subtask }>(),
    'Delete Subtask Error': props<ServiceErrorResponse>(),
    'Load Subtask Success': props<{ subtask: Subtask }>(),
    'Load Subtask Error': props<ServiceErrorResponse>(),
    'Update Subtask Success': props<{ subtask: Subtask }>(),
    'Update Subtask Error': props<ServiceErrorResponse>(),
  },
});
