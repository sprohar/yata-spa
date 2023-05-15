import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockTasks } from '../../__mock';
import { PaginatedList, TasksQueryParams } from '../../interfaces';
import { Priority, Tag, Task } from '../../models';
import { HttpErrorService } from './error/http-error.service';
import { YataApiService } from './yata-api.service';

interface TaskQueryParams {
  query: string;
  projectId?: number;
  priority?: Priority;
  start?: Date | null;
  end?: Date | null;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService extends YataApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly httpErrorService: HttpErrorService
  ) {
    super();
  }

  search(params: TaskQueryParams): Observable<Task[]> {
    const { query, projectId, priority, start, end } = params;

    const filteredTasks = mockTasks.filter((task) => {
      if (query && !task.title.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      if (projectId && task.projectId !== projectId) {
        return false;
      }
      if (priority && task.priority !== priority) {
        return false;
      }
      if (start && end && task.dueDate) {
        const dueDate = new Date(task.dueDate);
        if (dueDate < start || dueDate > end) {
          return false;
        }
      }
      if (start && task.dueDate && new Date(task.dueDate) < start) {
        return false;
      }
      if (end && task.dueDate && new Date(task.dueDate) > end) {
        return false;
      }
      return true;
    });

    return of(filteredTasks);
  }

  create(task: Task): Observable<Task> {
    const lastId = Math.max(...mockTasks.map((task) => task.id!));
    const newTask: Task = {
      ...task,
      id: lastId + 1,
    };

    mockTasks.push(newTask);
    return of(newTask);
  }

  duplicate(task: Task): Observable<Task> {
    const newTask = { ...task, id: Math.floor(Math.random() * 1000) };
    mockTasks.push(newTask);
    return of(newTask);
  }

  getAll(queryParams?: TasksQueryParams) {
    // filter tasks by queryParams
    if (queryParams) {
      const { priority, lte, gte } = queryParams;
      const filteredTaskSet = new Set<Task>();

      if (priority) {
        mockTasks
          .filter((task) => task.priority === priority)
          .forEach((t) => {
            filteredTaskSet.add(t);
          });
      }

      if (lte && gte) {
        mockTasks
          .filter((task) =>
            !task.dueDate
              ? false
              : new Date(task.dueDate) <= new Date(lte) &&
                new Date(task.dueDate) >= new Date(gte)
          )
          .forEach((t) => {
            filteredTaskSet.add(t);
          });
      } else if (lte && !gte) {
        mockTasks
          .filter((task) =>
            !task.dueDate ? false : new Date(task.dueDate) <= new Date(lte)
          )
          .forEach((t) => {
            filteredTaskSet.add(t);
          });
      } else if (gte && !lte) {
        mockTasks
          .filter((task) =>
            !task.dueDate ? false : new Date(task.dueDate) >= new Date(gte)
          )
          .forEach((t) => {
            filteredTaskSet.add(t);
          });
      }

      return of({
        pageIndex: 0,
        pageSize: 30,
        count: filteredTaskSet.size,
        data: Array.from(filteredTaskSet),
      } as PaginatedList<Task>);
    }

    return of({
      pageIndex: 0,
      pageSize: 30,
      count: mockTasks.length,
      data: Array.from(mockTasks),
    } as PaginatedList<Task>);
  }

  delete(task: Task): Observable<Task> {
    const idx = mockTasks.findIndex((t) => t.id === task.id);
    mockTasks.splice(idx, 1);
    return of(task);
  }

  removeTag(task: Task, tag: Tag): Observable<Task> {
    const idx = mockTasks.findIndex((t) => t.id === task.id);
    const taskWithTags = mockTasks[idx];
    const tagIdx = taskWithTags!.tags!.findIndex((t) => t.id === tag.id);
    taskWithTags!.tags!.splice(tagIdx, 1);
    return of(taskWithTags);
  }

  get(taskId: number): Observable<Task> {
    return of(mockTasks.find((task) => task.id === taskId)!);
  }

  update(id: number, task: Task | Partial<Task>): Observable<Task> {
    const idx = mockTasks.findIndex((t) => t.id === id);
    mockTasks[idx] = { ...mockTasks[idx], ...task };
    return of(mockTasks[idx]);
  }
}
