import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Project } from '../models/project.model';
import { YataApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService extends YataApiService {
  constructor(private http: HttpClient) {
    super();
  }

  create(project: Project) {
    const url = `${this.baseUrl}/projects`;
    return this.http
      .post<Project>(url, project)
      .pipe(catchError(this.handleError));
  }

  delete(projectId: number) {
    const url = `${this.baseUrl}/projects/${projectId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  get(projectId: number) {
    const url = `${this.baseUrl}/projects/${projectId}`;
    return this.http.get<Project>(url).pipe(catchError(this.handleError));
  }

  getAll() {
    const url = `${this.baseUrl}/projects`;
    return this.http
      .get<PaginatedList<Project>>(url)
      .pipe(catchError(this.handleError));
  }

  update(id: number, project: Partial<Project>) {
    const url = `${this.baseUrl}/projects/${id}`;
    return this.http
      .patch<Project>(url, project)
      .pipe(catchError(this.handleError));
  }
}
