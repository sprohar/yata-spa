import { Priority, Task } from './task.model';

type DragDropTargetData = {
  priority?: Priority;
  projectId?: number;
  dueDate?: string | null;
  sectionId?: number | null;
};

export interface Section {
  id?: number;
  name: string;
  projectId: number;
  tasks?: Task[];
  dragDropData?: DragDropTargetData;
}

export namespace Section {
  export enum Name {
    MaxLength = 64,
  }
}
