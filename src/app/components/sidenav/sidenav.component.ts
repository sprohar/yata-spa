import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { CreateTagDialogComponent } from '../../features/tags/components/create-tag-dialog/create-tag-dialog.component';
import { EditTagDialogComponent } from '../../features/tags/components/edit-tag-dialog/edit-tag-dialog.component';
import { Project, Tag } from '../../models';
import { ConfirmationDialogService } from '../../services';
import { EditProjectDialogComponent } from '../../shared/components/edit-project-dialog/edit-project-dialog.component';
import { SidenavActions } from '../../store/actions';
import {
  selectInbox,
  selectProjectsForSidenav,
  selectTags,
  selectUser,
} from '../../store/selectors';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'yata-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  private readonly destroy$ = new Subject<void>();
  readonly projects$ = this.store.select(selectProjectsForSidenav);
  readonly inbox$ = this.store.select(selectInbox);
  readonly tags$ = this.store.select(selectTags);
  readonly user$ = this.store.select(selectUser);
  readonly KANBAN_VIEW = Project.View.KANBAN;
  readonly LIST_VIEW = Project.View.LIST;

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly confirmationDialog: ConfirmationDialogService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
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
