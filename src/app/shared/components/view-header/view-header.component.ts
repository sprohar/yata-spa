import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { ConfirmationDialogComponent } from '../../../components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from '../../../interfaces/confirmation-dialog-data';
import { Project } from '../../../models';
import {
  KanbanViewActions,
  ListViewActions,
  ViewHeaderActions
} from '../../../store/actions';
import { selectCurrentProject } from '../../../store/selectors/projects.selectors';
import { CreateSectionDialogComponent } from '../create-section-dialog/create-section-dialog.component';
import { EditProjectDialogComponent } from '../edit-project-dialog/edit-project-dialog.component';

@Component({
  selector: 'yata-view-header',
  templateUrl: './view-header.component.html',
  styleUrls: ['./view-header.component.scss'],
})
export class ViewHeaderComponent implements OnDestroy {
  destroy$ = new EventEmitter<void>();
  currentProject$ = this.store.select(selectCurrentProject);

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.emit();
  }

  switchToKanbanView(project: Project) {
    this.router.navigate(['app', 'kanban', project.id!]);
    this.store.dispatch(
      ListViewActions.switchToKanbanView({
        project: {
          ...project,
          view: Project.View.KANBAN,
        },
      })
    );
  }

  switchToListView(project: Project) {
    this.router.navigate(['app', 'list', project.id!]);
    this.store.dispatch(
      KanbanViewActions.switchToListView({
        project: {
          ...project,
          view: Project.View.LIST,
        },
      })
    );
  }

  openDeleteProjectConfirmationDialog(project: Project) {
    const dialogData: ConfirmationDialogData = {
      title: 'Delete Project',
      content: 'Deleting a project will also delete all tasks. Continue?',
    };

    const ref = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed) => {
        if (confirmed && project) {
          this.store.dispatch(
            ViewHeaderActions.deleteProject({
              project,
            })
          );
        }
      });
  }

  openCreateSectionDialog(project: Project) {
    this.dialog.open(CreateSectionDialogComponent, {
      data: project,
    });
  }

  openEditProjectDialog(project: Project) {
    const ref = this.dialog.open(EditProjectDialogComponent, {
      data: project,
    });
  }
}
