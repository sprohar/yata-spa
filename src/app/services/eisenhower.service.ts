import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Task } from '../models';

type QueryParams = {
  skip: number;
  take: number;
};

@Injectable({
  providedIn: 'root',
})
export class EisenhowerService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllTasks(query?: QueryParams) {
    const url = `${this.baseUrl}/tasks`;
    return this.http.get<PaginatedList<Task>>(url, {
      params: query,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
