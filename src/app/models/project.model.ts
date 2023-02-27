import { Task } from './task.model';
import { Section } from './section.model';

export interface Project {
  id?: number;
  name: string;
  view?: Project.View;
  userId?: string;
  tasks?: Task[];
  sections?: Section[];
  createdAt?: string;
  updatedAt?: string;
}

export namespace Project {
  export enum View {
    LIST = 'LIST',
    KANBAN = 'KANBAN',
  }
  export enum Name {
    MaxLength = 64,
  }
}
