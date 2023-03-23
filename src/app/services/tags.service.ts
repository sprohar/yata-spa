import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from '../../environment/environment';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Tag } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService extends ApiService {
  private readonly path = environment.api.endpoints.tags;

  constructor(private http: HttpClient) {
    super();
  }

  create(tag: Tag) {
    const url = `${this.baseUrl}/${this.path}`;
    return this.http.post<Tag>(url, tag).pipe(catchError(this.handleError));
  }

  getAll() {
    const url = `${this.baseUrl}/${this.path}`;
    return this.http
      .get<PaginatedList<Tag>>(url)
      .pipe(catchError(this.handleError));
  }
}
