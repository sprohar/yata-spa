import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { PaginatedList } from '../../interfaces/paginated-list.interface';
import { Project } from '../../models/project.model';
import { YataApiService } from './yata-api.service';
import { HttpErrorService } from './error/http-error.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService extends YataApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly httpErrorService: HttpErrorService
  ) {
    super();
  }

  create(project: Project) {
    const url = `${this.serverUrl}/projects`;
    return this.http
      .post<Project>(url, project)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  delete(projectId: number) {
    const url = `${this.serverUrl}/projects/${projectId}`;
    return this.http
      .delete(url)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  get(projectId: number) {
    const url = `${this.serverUrl}/projects/${projectId}`;
    return this.http
      .get<Project>(url)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  getAll() {
    const url = `${this.serverUrl}/projects`;
    return this.http
      .get<PaginatedList<Project>>(url)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  update(id: number, project: Partial<Project>) {
    const url = `${this.serverUrl}/projects/${id}`;
    return this.http
      .patch<Project>(url, project)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }
}
