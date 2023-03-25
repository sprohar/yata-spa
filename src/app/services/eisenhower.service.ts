import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Task } from '../models';
import { YataApiService } from './api.service';

type QueryParams = {
  skip: number;
  take: number;
};

@Injectable({
  providedIn: 'root',
})
export class EisenhowerService extends YataApiService {
  constructor(private http: HttpClient) {
    super();
  }

  getAllTasks(query?: QueryParams) {
    const url = `${this.baseUrl}/tasks`;
    return this.http
      .get<PaginatedList<Task>>(url, {
        params: query,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }
}
