import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Tag, Task } from '../models/';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService extends YataApiService {
  constructor(private http: HttpClient) {
    super();
  }

  create(task: Task) {
    const url = `${this.baseUrl}/tasks`;
    return this.http
      .post<Task>(url, task)
      .pipe(take(1), catchError(this.handleError));
  }

  duplicate(task: Task) {
    const url = `${this.baseUrl}/tasks/${task.id}/duplicate`;
    return this.http
      .post<Task>(url, task)
      .pipe(take(1), catchError(this.handleError));
  }

  getAll() {
    const url = `${this.baseUrl}/tasks`;
    return this.http
      .get<PaginatedList<Task>>(url)
      .pipe(take(1), catchError(this.handleError));
  }

  delete(task: Task) {
    const url = `${this.baseUrl}/tasks/${task.id}`;
    return this.http.delete(url).pipe(take(1), catchError(this.handleError));
  }

  removeTag(task: Task, tag: Tag) {
    const url = `${this.baseUrl}/tasks/${task.id}/tags/${tag.id}`;
    return this.http
      .delete<Task>(url)
      .pipe(take(1), catchError(this.handleError));
  }

  get(taskId: number) {
    const url = `${this.baseUrl}/tasks/${taskId}`;
    return this.http.get<Task>(url).pipe(take(1), catchError(this.handleError));
  }

  update(id: number, task: Task | Partial<Task>) {
    const url = `${this.baseUrl}/tasks/${id}`;
    return this.http
      .patch<Task>(url, task)
      .pipe(take(1), catchError(this.handleError));
  }
}
