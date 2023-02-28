import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Project } from '../../../models';
import { KanbanViewActions, ListViewActions } from '../../../store/actions';
import { selectCurrentProject } from '../../../store/selectors/projects.selectors';

@Component({
  selector: 'yata-view-header',
  templateUrl: './view-header.component.html',
  styleUrls: ['./view-header.component.scss'],
})
export class ViewHeaderComponent {
  currentProject$ = this.store.select(selectCurrentProject);

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private router: Router
  ) {}

  switchToKanbanView(project: Project) {
    this.router.navigate(['kanban', project.id!]);
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
    this.router.navigate(['list', project.id!]);
    this.store.dispatch(
      KanbanViewActions.switchToListView({
        project: {
          ...project,
          view: Project.View.LIST,
        },
      })
    );
  }

  // openDeleteProjectConfirmationDialog() {
  //   const dialogData: ConfirmationDialogData = {
  //     title: 'Delete Project',
  //     content: 'Deleting a project will also delete all tasks. Continue?',
  //   };

  //   const ref = this.dialog.open(ConfirmationDialogComponent, {
  //     data: dialogData,
  //   });

  //   ref
  //     .afterClosed()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((confirmed) => {
  //       if (confirmed && this.project) {
  //         this.store.dispatch(
  //           ProjectPageActions.deleteProject({
  //             projectId: this.project.id!,
  //           })
  //         );
  //       }
  //     });
  // }

  // openProjectDetailsDialog() {
  //   const ref = this.dialog.open(ProjectDetailsDialogComponent, {
  //     data: this.project,
  //   });
  // }
}
