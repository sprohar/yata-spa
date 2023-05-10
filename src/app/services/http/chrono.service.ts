import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { mockTasks } from '../../__mock';
import { ChronoQueryParams, PaginatedList } from '../../interfaces';
import { Task } from '../../models';
import { HttpErrorService } from './error/http-error.service';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class ChronoService extends YataApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly httpErrorService: HttpErrorService
  ) {
    super();
  }

  getTodaysTasks() {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);

    const url = `${this.serverUrl}/tasks`;
    const params = new HttpParams()
      .set('gte', startDate.toISOString())
      .set('lte', endDate.toISOString());

    const lowerBound = new Date(new Date().setHours(0, 0, 0, 0));
    const upperBound = new Date(new Date().setHours(11, 59, 59, 999));

    return of({
      pageIndex: 0,
      pageSize: 30,
      count: mockTasks.length,
      data: mockTasks.filter((t) => {
        if (!t.dueDate) return false;
        const dueDate = new Date(t.dueDate);
        return dueDate >= lowerBound && dueDate <= upperBound;
      }),
    } as PaginatedList<Task>);

    // return this.http
    //   .get<PaginatedList<Task>>(url, { params })
    //   .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  getTasks(queryParams: ChronoQueryParams) {
    const url = `${this.serverUrl}/tasks`;
    const params = new HttpParams({
      fromObject: queryParams as { [param: string]: any },
    });

    return of({
      pageIndex: 0,
      pageSize: 30,
      count: mockTasks.length,
      data: Array.from(mockTasks),
    } as PaginatedList<Task>);

    // return this.http
    //   .get<PaginatedList<Task>>(url, { params })
    //   .pipe(take(1), catchError(this.httpErrorService.handleError));
  }
}
