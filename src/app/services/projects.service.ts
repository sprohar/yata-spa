import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedList } from '../interfaces/paginated-list.interface';
import { Project } from '../models/project.model';

const url = 'http://localhost:7070/projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  create(project: Project) {
    return this.http.post<Project>(url, project);
  }

  delete(projectId: number) {
    return this.http.delete(`${url}/${projectId}`);
  }

  get(projectId: number) {
    return this.http.get<Project>(`${url}/${projectId}`);
  }

  getAll() {
    return this.http.get<PaginatedList<Project>>(url);
  }

  update(project: Partial<Project>) {
    return this.http.patch<Project>(`${url}/${project.id}`, project);
  }
}
