import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Subtask } from '../models/subtask.model';

const baseUrl = 'http://localhost:7070/tasks';

@Injectable({
  providedIn: 'root',
})
export class SubtasksService {
  constructor(private readonly http: HttpClient) {}

  create(subtask: Subtask) {
    const url = `${baseUrl}/${subtask.taskId!}/subtasks`;
    return this.http.post<Subtask>(url, subtask);
  }

  delete(subtask: Subtask) {
    const url = `${baseUrl}/${subtask.taskId}/subtasks/${subtask.id}`;
    return this.http.delete<void>(url);
  }

  get(taskId: number, subtaskId: number) {
    const url = `${baseUrl}/${taskId!}/subtasks/${subtaskId}`;
    return this.http.get<Subtask>(url);
  }

  getAll(taskId: number) {
    const url = `${baseUrl}/${taskId}/subtasks`;
    return this.http.get<PaginatedList<Subtask>>(url);
  }

  update(subtask: Subtask | Partial<Subtask>) {
    const url = `${baseUrl}/${subtask.taskId!}/subtasks/${subtask.id}`;
    return this.http.patch<Subtask>(url, subtask);
  }
}
