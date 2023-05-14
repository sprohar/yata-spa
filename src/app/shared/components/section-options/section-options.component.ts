import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Project, Section } from '../../../models';
import { ConfirmationDialogService } from '../../../services/confirmation-dialog.service';
import { SectionOptionsActions } from '../../../store/actions';
import { selectProjects } from '../../../store/selectors';
import { EditSectionDialogComponent } from '../edit-section-dialog/edit-section-dialog.component';

type MenuOptionsDirection = 'vertical' | 'horizontal';

@Component({
  selector: 'yata-section-options',
  templateUrl: './section-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgFor,
    AsyncPipe,
  ],
})
export class SectionOptionsComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly projects$ = this.store.select(selectProjects);

  @Input() direction: MenuOptionsDirection = 'vertical';
  @Input() section?: Section;
  @Input() project?: Project;

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly confirmationDialog: ConfirmationDialogService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    if (!this.section) {
      throw new Error('"section" is undefined');
    }
  }

  get icon() {
    return this.direction === 'horizontal' ? 'more_horiz' : 'more_vert';
  }

  trackByProjectId(_index: number, project: Project) {
    return project.id;
  }

  handleMoveToProject(targetProjectId: number) {
    this.store.dispatch(
      SectionOptionsActions.moveToProject({
        sourceProjectId: this.section?.projectId!,
        targetProjectId,
        section: this.section!,
      })
    );
  }

  handleEdit() {
    this.dialog.open(EditSectionDialogComponent, {
      data: this.section,
    });
  }

  handleDelete() {
    const ref = this.confirmationDialog.open({
      title: 'Delete Column',
      message: 'All tasks in this column will be removed. Continue?',
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.store.dispatch(
            SectionOptionsActions.deleteSection({
              section: this.section!,
            })
          );
        }
      });
  }
}
