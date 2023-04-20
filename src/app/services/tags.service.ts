import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Tag, Task } from '../models';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService extends YataApiService {
  constructor(private http: HttpClient) {
    super();
  }

  create(tag: Tag) {
    const url = `${this.baseUrl}/tags`;
    return this.http
      .post<Tag>(url, tag)
      .pipe(take(1), catchError(this.handleError));
  }

  delete(tag: Tag) {
    const url = `${this.baseUrl}/tags/${tag.id}`;
    return this.http
      .delete<Tag>(url)
      .pipe(take(1), catchError(this.handleError));
  }

  getAll() {
    const url = `${this.baseUrl}/tags`;
    return this.http
      .get<PaginatedList<Tag>>(url)
      .pipe(take(1), catchError(this.handleError));
  }

  getTasks(tagId: number) {
    const url = `${this.baseUrl}/tags/${tagId}/tasks`;
    return this.http
      .get<PaginatedList<Task>>(url)
      .pipe(take(1), catchError(this.handleError));
  }

  update(tag: Tag) {
    const url = `${this.baseUrl}/tags/${tag.id}`;
    return this.http
      .patch<Tag>(url, tag)
      .pipe(take(1), catchError(this.handleError));
  }
}
