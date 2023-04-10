import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { ChronoQueryParams, PaginatedList } from '../interfaces/';
import { Task } from '../models';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class ChronoService extends YataApiService {
  constructor(private http: HttpClient) {
    super();
  }

  getTodaysTasks() {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);

    const url = `${this.baseUrl}/tasks`;
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());

    return this.http
      .get<PaginatedList<Task>>(url, { params })
      .pipe(take(1), catchError(this.handleError));
  }

  getTasks(queryParams: ChronoQueryParams) {
    const url = `${this.baseUrl}/tasks`;
    const params = new HttpParams({
      fromObject: { ...queryParams },
    });

    return this.http
      .get<PaginatedList<Task>>(url, { params })
      .pipe(take(1), catchError(this.handleError));
  }
}
