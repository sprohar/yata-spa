import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Task } from '../models/';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  create(task: Task) {
    const url = `${this.baseUrl}/tasks`;
    return this.http.post<Task>(url, task);
  }

  delete(task: Task) {
    const url = `${this.baseUrl}/tasks/${task.id}`;
    return this.http.delete(url);
  }

  get(taskId: number) {
    const url = `${this.baseUrl}/tasks/${taskId}`;
    return this.http.get<Task>(url);
  }

  getProjectTasks(projectId: number) {
    const url = `${this.baseUrl}/projects/${projectId}/tasks`;
    return this.http.get<PaginatedList<Task>>(url);
  }

  update(task: Task | Partial<Task>) {
    const url = `${this.baseUrl}/tasks/${task.id}`;
    return this.http.patch<Task>(url, task);
  }
}
