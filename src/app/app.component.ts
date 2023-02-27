import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, shareReplay } from 'rxjs';
import { Project } from './models';
import { SidenavActions } from './store/actions';
import { selectProjects } from './store/reducers/projects.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  projects$ = this.store.select(selectProjects);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(SidenavActions.onInit());
  }

  trackByProjectId(index: number, project: Project) {
    return project.id;
  }

  openAddProjectDialog() {
    // TODO:  this.dialog.open(AddProjectDialogComponent);
  }

  handleSetCurrentProject(project: Project) {
    switch (project.view) {
      case Project.View.KANBAN:
        this.router.navigate(['kanban', project.id]);
        break;
      case Project.View.LIST:
        this.router.navigate(['list', project.id]);
        break;
      default:
        break;
    }
  }
}
