import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockSections } from '../../__mock';
import { Section } from '../../models/section.model';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class SectionsService extends YataApiService {
  constructor() {
    super();
  }

  create(section: Section): Observable<Section> {
    const lastId: number = Math.max(
      ...mockSections.map((section) => section.id!)
    );
    const newSection: Section = {
      ...section,
      id: lastId + 1,
    };
    mockSections.push(newSection);
    return of(newSection);
  }

  delete(section: Section): Observable<Section> {
    const idx = mockSections.findIndex((s) => s.id === section.id);
    mockSections.splice(idx, 1);
    return of(section);
  }

  get(projectId: number, sectionId: number): Observable<Section> {
    const section = mockSections.find(
      (s) => s.id === sectionId && s.projectId === projectId
    );

    return of(section!);
  }

  getAll(projectId: number): Observable<Section> {
    return of(mockSections.find((s) => s.projectId === projectId)!);
  }

  update(section: Partial<Section>): Observable<Section> {
    // update the section
    const idx = mockSections.findIndex((s) => s.id === section.id);
    mockSections[idx] = { ...mockSections[idx], ...section };
    return of(mockSections[idx]);
  }
}
