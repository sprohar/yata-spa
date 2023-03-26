import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { environment } from '../../environment/environment';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Tag, Task } from '../models';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService extends YataApiService {
  private readonly path = environment.api.endpoints.tags;

  constructor(private http: HttpClient) {
    super();
  }

  create(tag: Tag) {
    const url = `${this.baseUrl}/${this.path}`;
    return this.http
      .post<Tag>(url, tag)
      .pipe(take(1), catchError(this.handleError));
  }

  delete(tag: Tag) {
    const url = `${this.baseUrl}/${this.path}/${tag.id}`;
    return this.http
      .delete<Tag>(url)
      .pipe(take(1), catchError(this.handleError));
  }

  getAll() {
    const url = `${this.baseUrl}/${this.path}`;
    return this.http
      .get<PaginatedList<Tag>>(url)
      .pipe(take(1), catchError(this.handleError));
  }

  getTasks(tagId: number) {
    const url = `${this.baseUrl}/${this.path}/${tagId}/tasks`;
    return this.http
      .get<PaginatedList<Task>>(url)
      .pipe(take(1), catchError(this.handleError));
  }

  update(tag: Tag) {
    const url = `${this.baseUrl}/${this.path}/${tag.id}`;
    return this.http
      .patch<Tag>(url, tag)
      .pipe(take(1), catchError(this.handleError));
  }
}
