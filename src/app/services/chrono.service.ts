import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from '../../environment/environment';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Task } from '../models';
import { YataApiService } from './api.service';

type ChronoQueryParams = {
  skip?: number;
  take?: number;
  from?: string;
  to?: string;
};

@Injectable({
  providedIn: 'root',
})
export class ChronoService extends YataApiService {
  constructor(private http: HttpClient) {
    super();
  }

  getTodaysTasks() {
    const url = `${this.baseUrl}/${environment.api.endpoints.chrono.today}`;
    return this.http
      .get<PaginatedList<Task>>(url)
      .pipe(catchError(this.handleError));
  }

  getTasks(params: ChronoQueryParams) {
    const url = `${this.baseUrl}/${environment.api.endpoints.chrono.tasks}`;
    return this.http
      .get<PaginatedList<Task>>(url, { params: params })
      .pipe(catchError(this.handleError));
  }
}
