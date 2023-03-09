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
    const url = `${this.baseUrl}/projects/${task.projectId}/tasks`;
    return this.http.post<Task>(url, task);
  }
  
  duplicate(task: Task) {
    const url = `${this.baseUrl}/projects/${task.projectId}/tasks/${task.id}/duplicate`;
    return this.http.post<Task>(url, task);
  }

  getAll(projectId: number) {
    const url = `${this.baseUrl}/projects/${projectId}/tasks`;
    return this.http.get<PaginatedList<Task>>(url);
  }

  delete(task: Task) {
    const url = `${this.baseUrl}/projects/${task.projectId}/tasks/${task.id}`;
    return this.http.delete(url);
  }

  get(projectId: number, taskId: number) {
    const url = `${this.baseUrl}/projects/${projectId}/tasks/${taskId}`;
    return this.http.get<Task>(url);
  }

  update(id: number, task: Task | Partial<Task>) {
    const url = `${this.baseUrl}/projects/${task.projectId}/tasks/${task.id}`;
    return this.http.patch<Task>(url, task);
  }
}
