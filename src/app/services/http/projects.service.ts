import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaginatedList } from '../../interfaces/paginated-list.interface';
import { Project } from '../../models/project.model';
import * as db from '../../__mock';
import { YataApiService } from './yata-api.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorService } from './error/http-error.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService extends YataApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly httpErrorService: HttpErrorService,
  ) {
    super();
  }

  create(project: Project): Observable<Project> {
    const lastId = Math.max(...db.mockProjects.map((p) => p.id!));
    const newProject: Project = {
      ...project,
      id: lastId + 1,
    };
    db.mockProjects.push(newProject);
    return of(newProject);
  }

  delete(projectId: number): Observable<Project> {
    const idx = db.mockProjects.findIndex((p) => p.id === projectId);
    const projects = db.mockProjects.splice(idx, 1);
    return of(projects[0]);
  }

  get(projectId: number): Observable<Project> {
    const project = db.mockProjects.find((p) => p.id === projectId)!;
    return of({
      ...project,
      tasks: db.mockTasks.filter((t) => t.projectId === projectId),
      sections: db.mockSections.filter((s) => s.projectId === projectId),
    } as Project);
  }

  getAll() {
    return of({
      pageIndex: 0,
      pageSize: 30,
      count: db.mockProjects.length,
      data: Array.from(db.mockProjects),
    } as PaginatedList<Project>);
  }

  update(projectId: number, project: Partial<Project>) {
    const idx = db.mockProjects.findIndex((p) => p.id === projectId);
    db.mockProjects[idx] = {
      ...db.mockProjects[idx],
      ...project,
    };

    return of(db.mockProjects[idx]);
  }
}
