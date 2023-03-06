import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Project } from '../models/project.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(project: Project) {
    const url = `${this.baseUrl}/projects`;
    return this.http.post<Project>(url, project);
  }

  delete(projectId: number) {
    const url = `${this.baseUrl}/projects/${projectId}`;
    return this.http.delete(url);
  }

  get(projectId: number) {
    const url = `${this.baseUrl}/projects/${projectId}`;
    return this.http.get<Project>(url);
  }

  getAll() {
    const url = `${this.baseUrl}/projects`;
    return this.http.get<PaginatedList<Project>>(url);
  }

  update(id: number, project: Partial<Project>) {
    const url = `${this.baseUrl}/projects/${id}`;
    return this.http.patch<Project>(url, project);
  }
}
