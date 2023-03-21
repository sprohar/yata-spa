import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Section } from '../models/section.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SectionsService extends ApiService {
  constructor(private http: HttpClient) {
    super();
  }

  create(section: Section) {
    return this.http
      .post<Section>(
        `${this.baseUrl}/projects/${section.projectId}/sections`,
        section
      )
      .pipe(catchError(this.handleError));
  }

  delete(section: Section) {
    const { projectId, id: sectionId } = section;
    return this.http
      .delete<void>(
        `${this.baseUrl}/projects/${projectId}/sections/${sectionId}`
      )
      .pipe(catchError(this.handleError));
  }

  get(projectId: number, sectionId: number) {
    return this.http
      .get<Section>(
        `${this.baseUrl}/projects/${projectId}/sections/${sectionId}`
      )
      .pipe(catchError(this.handleError));
  }

  getAll(projectId: number) {
    return this.http
      .get<Section>(`${this.baseUrl}/projects/${projectId}`)
      .pipe(catchError(this.handleError));
  }

  update(section: Partial<Section>) {
    return this.http
      .patch<Section>(
        `${this.baseUrl}/projects/${section.projectId}/sections/${section.id!}`,
        section
      )
      .pipe(catchError(this.handleError));
  }
}
