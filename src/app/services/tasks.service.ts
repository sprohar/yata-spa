import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Task } from '../models/task.model';

const baseUrl = 'http://localhost:7070/projects';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  create(task: Task) {
    const url = `${baseUrl}/${task.projectId!}/tasks`;
    return this.http.post<Task>(url, task);
  }
  
  delete(projectId: number, taskId: number) {
    const url = `${baseUrl}/${projectId!}/tasks/${taskId}`;
    return this.http.delete(url);
  }
  
  get(projectId: number, taskId: number) {
    const url = `${baseUrl}/${projectId!}/tasks/${taskId}`;
    return this.http.get<Task>(url);
  }

  getAll(projectId: number) {
    const url = `${baseUrl}/${projectId}/tasks`;
    return this.http.get<PaginatedList<Task>>(url);
  }

  update(taskId: number, task: Task | Partial<Task>) {
    const url = `${baseUrl}/${task.projectId!}/tasks/${taskId}`;
    return this.http.patch<Task>(url, task);
  }
}
