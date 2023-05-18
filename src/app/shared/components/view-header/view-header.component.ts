import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationDialogComponent } from '../../../components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from '../../../interfaces/confirmation-dialog-data';
import { Project } from '../../../models';
import {
  KanbanViewActions,
  ListViewActions,
  ViewHeaderActions,
} from '../../../store/actions';
import { selectCurrentProject } from '../../../store/selectors/projects.selectors';
import { CreateSectionDialogComponent } from '../create-section-dialog/create-section-dialog.component';
import {
  CreateTaskDialogComponent,
  CreateTaskDialogData,
} from '../create-task-dialog/create-task-dialog.component';
import { EditProjectDialogComponent } from '../edit-project-dialog/edit-project-dialog.component';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { TasksOrderByOptionsComponent } from '../tasks-order-by-options/tasks-order-by-options.component';

@Component({
  selector: 'yata-view-header',
  templateUrl: './view-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    TasksOrderByOptionsComponent,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
  ],
})
export class ViewHeaderComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  readonly currentProject$ = this.store.select(selectCurrentProject);
  readonly LIST_VIEW = Project.View.LIST;
  readonly KANBAN_VIEW = Project.View.KANBAN;

  @Input() title?: string;

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  openSearchDialog() {
    this.dialog.open(SearchDialogComponent);
  }

  openCreateTaskDialog(project: Project) {
    this.dialog.open(CreateTaskDialogComponent, {
      width: '100%',
      height: '100%',
      data: {
        project,
      } as CreateTaskDialogData,
    });
  }

  handleSwitchView(project: Project) {
    if (project.view === Project.View.LIST) {
      this.switchToKanbanView(project);
    } else {
      this.switchToListView(project);
    }
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
      message: 'Deleting a project will also delete all tasks. Continue?',
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
    this.dialog.open(EditProjectDialogComponent, {
      data: project,
    });
  }
}
