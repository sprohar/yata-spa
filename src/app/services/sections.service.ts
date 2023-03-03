import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Section } from '../models/section.model';

const baseUrl = 'http://localhost:7070';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  constructor(private http: HttpClient) {}

  create(section: Section) {
    return this.http.post<Section>(
      `${baseUrl}/projects/${section.projectId}/sections`,
      section
    );
  }

  delete(section: Section) {
    const { projectId, id: sectionId } = section;
    return this.http.delete<void>(
      `${baseUrl}/projects/${projectId}/sections/${sectionId}`
    );
  }

  get(projectId: number, sectionId: number) {
    return this.http.get<Section>(
      `${baseUrl}/projects/${projectId}/sections/${sectionId}`
    );
  }

  getAll(projectId: number) {
    return this.http.get<Section>(`${baseUrl}/projects/${projectId}`);
  }

  update(section: Partial<Section>) {
    return this.http.patch<Section>(
      `${baseUrl}/projects/${section.projectId}/sections/${section.id!}`,
      section
    );
  }
}
