import { Task } from './task.model';

export interface Section {
  id?: number;
  name: string;
  projectId: number;
  tasks?: Task[];
}

export namespace Section {
  export enum Name {
    MaxLength = 64,
  }
}
