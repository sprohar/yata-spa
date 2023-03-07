import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Section } from '../models/section.model';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  private readonly baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  create(section: Section) {
    return this.http.post<Section>(
      `${this.baseUrl}/projects/${section.projectId}/sections`,
      section
    );
  }

  delete(section: Section) {
    const { projectId, id: sectionId } = section;
    return this.http.delete<void>(
      `${this.baseUrl}/projects/${projectId}/sections/${sectionId}`
    );
  }

  get(projectId: number, sectionId: number) {
    return this.http.get<Section>(
      `${this.baseUrl}/projects/${projectId}/sections/${sectionId}`
    );
  }

  getAll(projectId: number) {
    return this.http.get<Section>(`${this.baseUrl}/projects/${projectId}`);
  }

  update(section: Partial<Section>) {
    return this.http.patch<Section>(
      `${this.baseUrl}/projects/${section.projectId}/sections/${section.id!}`,
      section
    );
  }
}
