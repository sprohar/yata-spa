import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Subtask } from '../models/subtask.model';
import { ApiService } from './api.service';

const baseUrl = 'http://localhost:7070';

@Injectable({
  providedIn: 'root',
})
export class SubtasksService extends ApiService {
  constructor(private readonly http: HttpClient) {
    super();
  }

  create(subtask: Subtask) {
    const url = `${baseUrl}/subtasks`;
    return this.http
      .post<Subtask>(url, subtask)
      .pipe(catchError(this.handleError));
  }

  delete(subtask: Subtask) {
    const url = `${baseUrl}/subtasks/${subtask.id}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  get(taskId: number, subtaskId: number) {
    const url = `${baseUrl}/subtasks/${subtaskId}`;
    return this.http.get<Subtask>(url).pipe(catchError(this.handleError));
  }

  getAll(taskId: number) {
    const url = `${baseUrl}/${taskId}/subtasks`;
    return this.http
      .get<PaginatedList<Subtask>>(url)
      .pipe(catchError(this.handleError));
  }

  update(subtask: Subtask | Partial<Subtask>) {
    const url = `${baseUrl}/subtasks/${subtask.id}`;
    return this.http
      .patch<Subtask>(url, subtask)
      .pipe(catchError(this.handleError));
  }
}
