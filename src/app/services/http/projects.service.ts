import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import * as db from '../../__mock';
import { PaginatedList } from '../../interfaces/paginated-list.interface';
import { Project } from '../../models/project.model';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService extends YataApiService {
  constructor() {
    super();
  }

  create(project: Project): Observable<Project> {
    return of({ ...project });
  }

  delete(projectId: number): Observable<Project> {
    const idx = db.mockProjects.findIndex((p) => p.id === projectId);
    const projects = db.mockProjects.splice(idx, 1);
    return of(projects[0]);
  }

  get(projectId: number) {
    const project = db.mockProjects.find((p) => p.id === projectId)!;
    return of({
      ...project,
      tasks: db.mockTasks.filter((t) => t.projectId === projectId),
      sections: db.mockSections.filter((s) => s.projectId === projectId),
    }).pipe(tap((project) => console.log(project)));
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
