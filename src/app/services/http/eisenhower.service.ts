import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { mockTasks } from '../../__mock';
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
    return of({
      pageIndex: 0,
      pageSize: 30,
      count: mockTasks.length,
      data: Array.from(mockTasks),
    } as PaginatedList<Task>);
  }
}
