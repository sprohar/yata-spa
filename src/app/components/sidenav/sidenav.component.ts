import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { CreateTagDialogComponent } from '../../features/tags/components/create-tag-dialog/create-tag-dialog.component';
import { EditTagDialogComponent } from '../../features/tags/components/edit-tag-dialog/edit-tag-dialog.component';
import { Project, Tag } from '../../models';
import { BreakpointService, ConfirmationDialogService } from '../../services';
import { EditProjectDialogComponent } from '../../shared/components/edit-project-dialog/edit-project-dialog.component';
import { SidenavItem } from '../../shared/directives/sidenav-item.directive';
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
  standalone: true,
  imports: [
    NgIf,
    MatListModule,
    RouterLink,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    NgFor,
    MatMenuModule,
    AsyncPipe,
    SidenavItem,
  ],
})
export class SidenavComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly projects$ = this.store.select(selectProjectsForSidenav);
  readonly inbox$ = this.store.select(selectInbox);
  readonly tags$ = this.store.select(selectTags);
  readonly user$ = this.store.select(selectUser);
  readonly KANBAN_VIEW = Project.View.KANBAN;
  readonly LIST_VIEW = Project.View.LIST;
  private isHandset = true;

  @Output() readonly closeSidenav = new EventEmitter<void>();

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly confirmationDialog: ConfirmationDialogService,
    private readonly breakpointService: BreakpointService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.breakpointService.isHandset$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isHandset) => (this.isHandset = isHandset));
  }

  trackByProjectId(_index: number, project: Project) {
    return project.id;
  }

  trackByTagId(_index: number, tag: Tag) {
    return tag.id;
  }

  handleCloseSidenav() {
    if (this.isHandset) {
      this.closeSidenav.emit();
    }
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
