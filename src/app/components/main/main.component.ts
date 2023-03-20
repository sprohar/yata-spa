import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Project } from '../../models';
import { BreakpointService } from '../../services/breakpoint.service';
import { AuthActions } from '../../store/actions';
import { selectUser } from '../../store/reducers/auth.reducer';
import { selectProjects } from '../../store/selectors';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'yata-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  projects$ = this.store.select(selectProjects);
  isHandset$ = this.breakpointService.isHandset$;
  user$ = this.store.select(selectUser);

  constructor(
    private breakpointService: BreakpointService,
    private store: Store,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  trackByProjectId(index: number, project: Project) {
    return project.id;
  }

  openAddProjectDialog() {
    this.dialog.open(CreateProjectDialogComponent);
  }

  /**
   * @see https://fonts.google.com/icons
   * @param project
   * @returns
   */
  getProjectViewIcon(project: Project) {
    return project.view === Project.View.LIST ? 'view_list' : 'view_kanban';
  }

  handleSetCurrentProject(project: Project) {
    switch (project.view) {
      case Project.View.KANBAN:
        this.router.navigate(['app', 'kanban', project.id]);
        break;
      case Project.View.LIST:
        this.router.navigate(['app', 'list', project.id]);
        break;
      default:
        break;
    }
  }
}
