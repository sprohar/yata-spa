import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { Section } from '../../models/section.model';
import { HttpErrorService } from './error/http-error.service';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class SectionsService extends YataApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly httpErrorService: HttpErrorService
  ) {
    super();
  }

  create(section: Section) {
    return this.http
      .post<Section>(
        `${this.serverUrl}/projects/${section.projectId}/sections`,
        section
      )
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  delete(section: Section) {
    const { projectId, id: sectionId } = section;
    return this.http
      .delete<void>(
        `${this.serverUrl}/projects/${projectId}/sections/${sectionId}`
      )
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  get(projectId: number, sectionId: number) {
    return this.http
      .get<Section>(
        `${this.serverUrl}/projects/${projectId}/sections/${sectionId}`
      )
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  getAll(projectId: number) {
    return this.http
      .get<Section>(`${this.serverUrl}/projects/${projectId}`)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }

  update(section: Partial<Section>) {
    return this.http
      .patch<Section>(
        `${this.serverUrl}/projects/${
          section.projectId
        }/sections/${section.id!}`,
        section
      )
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }
}
