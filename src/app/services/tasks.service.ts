import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Task } from '../models/';
import { YataApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService extends YataApiService {
  constructor(private http: HttpClient) {
    super();
  }

  create(task: Task) {
    const url = `${this.baseUrl}/projects/${task.projectId}/tasks`;
    return this.http
      .post<Task>(url, task)
      .pipe(take(1), catchError(this.handleError));
  }

  duplicate(task: Task) {
    const url = `${this.baseUrl}/projects/${task.projectId}/tasks/${task.id}/duplicate`;
    return this.http.post<Task>(url, task).pipe(catchError(this.handleError));
  }

  getAll(projectId: number) {
    const url = `${this.baseUrl}/projects/${projectId}/tasks`;
    return this.http
      .get<PaginatedList<Task>>(url)
      .pipe(catchError(this.handleError));
  }

  delete(task: Task) {
    const url = `${this.baseUrl}/projects/${task.projectId}/tasks/${task.id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  get(projectId: number, taskId: number) {
    const url = `${this.baseUrl}/projects/${projectId}/tasks/${taskId}`;
    return this.http.get<Task>(url).pipe(catchError(this.handleError));
  }

  update(id: number, task: Task | Partial<Task>) {
    const url = `${this.baseUrl}/projects/${task.projectId}/tasks/${id}`;
    return this.http.patch<Task>(url, task).pipe(catchError(this.handleError));
  }
}
