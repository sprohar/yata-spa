import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Subtask } from '../models/subtask.model';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class SubtasksService extends YataApiService {
  constructor(private readonly http: HttpClient) {
    super();
  }

  create(subtask: Subtask) {
    const url = `${this.baseUrl}/subtasks`;
    return this.http
      .post<Subtask>(url, subtask)
      .pipe(take(1), catchError(this.handleError));
  }

  delete(subtask: Subtask) {
    const url = `${this.baseUrl}/subtasks/${subtask.id}`;
    return this.http
      .delete<void>(url)
      .pipe(take(1), catchError(this.handleError));
  }

  get(taskId: number, subtaskId: number) {
    const url = `${this.baseUrl}/subtasks/${subtaskId}`;
    return this.http
      .get<Subtask>(url)
      .pipe(take(1), catchError(this.handleError));
  }

  getAll(taskId: number) {
    const url = `${this.baseUrl}/${taskId}/subtasks`;
    return this.http
      .get<PaginatedList<Subtask>>(url)
      .pipe(take(1), catchError(this.handleError));
  }

  update(subtask: Subtask | Partial<Subtask>) {
    const url = `${this.baseUrl}/subtasks/${subtask.id}`;
    return this.http
      .patch<Subtask>(url, subtask)
      .pipe(take(1), catchError(this.handleError));
  }
}
