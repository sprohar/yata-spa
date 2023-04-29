import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { PaginatedList } from '../../interfaces/paginated-list.interface';
import { Tag, Task } from '../../models';
import { HttpErrorService } from './error/http-error.service';
import { YataApiService } from './yata-api.service';

type SearchArgs = { query: string; projectId?: number };

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

  search(args: SearchArgs) {
    const url = `${this.serverUrl}/tasks/search`;
    const httpParams = new HttpParams().set('query', args.query);
    return this.http
      .get<Task[]>(url, {
        params: args.projectId
          ? httpParams.set('projectId', args.projectId)
          : httpParams,
      })
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  create(task: Task) {
    const url = `${this.serverUrl}/tasks`;
    return this.http
      .post<Task>(url, task)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  duplicate(task: Task) {
    const url = `${this.serverUrl}/tasks/${task.id}/duplicate`;
    return this.http
      .post<Task>(url, task)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  getAll() {
    const url = `${this.serverUrl}/tasks`;
    return this.http
      .get<PaginatedList<Task>>(url)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  delete(task: Task) {
    const url = `${this.serverUrl}/tasks/${task.id}`;
    return this.http
      .delete(url)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  removeTag(task: Task, tag: Tag) {
    const url = `${this.serverUrl}/tasks/${task.id}/tags/${tag.id}`;
    return this.http
      .delete<Task>(url)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  get(taskId: number) {
    const url = `${this.serverUrl}/tasks/${taskId}`;
    return this.http
      .get<Task>(url)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  update(id: number, task: Task | Partial<Task>) {
    const url = `${this.serverUrl}/tasks/${id}`;
    return this.http
      .patch<Task>(url, task)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }
}
