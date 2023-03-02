import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Task } from '../models/';

const baseUrl = 'http://localhost:7070';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  create(task: Task) {
    const url = `${baseUrl}/tasks`;
    return this.http.post<Task>(url, task);
  }

  delete(task: Task) {
    const url = `${baseUrl}/tasks/${task.id}`;
    return this.http.delete(url);
  }

  get(taskId: number) {
    const url = `${baseUrl}/tasks/${taskId}`;
    return this.http.get<Task>(url);
  }

  getProjectTasks(projectId: number) {
    const url = `${baseUrl}/${projectId}/tasks`;
    return this.http.get<PaginatedList<Task>>(url);
  }

  update(task: Task | Partial<Task>) {
    const url = `${baseUrl}/tasks/${task.id}`;
    return this.http.patch<Task>(url, task);
  }
}
