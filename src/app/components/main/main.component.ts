import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Project, Tag } from '../../models';
import { BreakpointService } from '../../services/breakpoint.service';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { EditProjectDialogComponent } from '../../shared/components/edit-project-dialog/edit-project-dialog.component';
import { AuthActions, SidenavActions } from '../../store/actions';
import { selectUser } from '../../store/reducers/auth.reducer';
import {
  selectInbox,
  selectProjectsForSidenav,
  selectTags,
} from '../../store/selectors';
import { CreateTagDialogComponent } from '../../tags/components/create-tag-dialog/create-tag-dialog.component';
import { EditTagDialogComponent } from '../../tags/components/edit-tag-dialog/edit-tag-dialog.component';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'yata-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  projects$ = this.store.select(selectProjectsForSidenav);
  inbox$ = this.store.select(selectInbox);
  tags$ = this.store.select(selectTags);
  isHandset$ = this.breakpointService.isHandset$;
  user$ = this.store.select(selectUser);

  readonly KANBAN_VIEW = Project.View.KANBAN;
  readonly LIST_VIEW = Project.View.LIST;

  constructor(
    private breakpointService: BreakpointService,
    private store: Store,
    private dialog: MatDialog,
    private confirmationDialog: ConfirmationDialogService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  trackByProjectId(_index: number, project: Project) {
    return project.id;
  }

  trackByTagId(_index: number, tag: Tag) {
    return tag.id;
  }

  // =================== Projects ============================

  openCreateProjectDialog() {
    this.dialog.open(CreateProjectDialogComponent);
  }

  openEditProjectDialog(project: Project) {
    this.dialog.open(EditProjectDialogComponent, {
      data: project,
    });
  }

  openDeleteProjectDialog(project: Project) {
    const ref = this.confirmationDialog.open({
      title: 'Confirmation',
      message: `Delete ${project.name}?`,
      confirmButtonColor: 'warn',
      confirmButtonText: 'Delete',
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.store.dispatch(
            SidenavActions.deleteProject({
              project,
            })
          );
        }
      });
  }

  // =================== Tags ============================

  openCreateTagDialog() {
    this.dialog.open(CreateTagDialogComponent);
  }

  openEditTagDialog(tag: Tag) {
    this.dialog.open(EditTagDialogComponent, {
      data: tag,
    });
  }

  openDeleteTagConfirmationDialog(tag: Tag) {
    const ref = this.confirmationDialog.open({
      title: 'Confirmation',
      message: 'Delete tag?',
      confirmButtonColor: 'warn',
      confirmButtonText: 'Delete',
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.store.dispatch(
            SidenavActions.deleteTag({
              tag,
            })
          );
        }
      });
  }
}
