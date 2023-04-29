import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { PaginatedList } from '../../interfaces/paginated-list.interface';
import { Task } from '../../models';
import { HttpErrorService } from './error/http-error.service';
import { YataApiService } from './yata-api.service';

type QueryParams = {
  skip: number;
  take: number;
};

@Injectable({
  providedIn: 'root',
})
export class EisenhowerService extends YataApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly httpErrorService: HttpErrorService
  ) {
    super();
  }

  getAllTasks(query?: QueryParams) {
    const url = `${this.serverUrl}/tasks`;
    return this.http
      .get<PaginatedList<Task>>(url, {
        params: query,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }
}
