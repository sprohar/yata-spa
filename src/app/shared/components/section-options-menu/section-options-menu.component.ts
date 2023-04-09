import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Project, Section } from '../../../models';
import { ConfirmationDialogService } from '../../../services/confirmation-dialog.service';
import { SectionOptionsMenuActions } from '../../../store/actions';
import { selectProjects } from '../../../store/selectors';
import { EditSectionDialogComponent } from '../edit-section-dialog/edit-section-dialog.component';

type MenuOptionsDirection = 'vertical' | 'horizontal';

@Component({
  selector: 'yata-section-options-menu',
  templateUrl: './section-options-menu.component.html',
  styleUrls: ['./section-options-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionOptionsMenuComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();

  @Input() direction: MenuOptionsDirection = 'vertical';
  @Input() section?: Section;

  projects$ = this.store.select(selectProjects);

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private confirmationDialog: ConfirmationDialogService
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
      SectionOptionsMenuActions.moveToProject({
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
      content: 'All tasks in this column will be removed. Continue?',
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.store.dispatch(
            SectionOptionsMenuActions.deleteSection({
              section: this.section!,
            })
          );
        }
      });
  }
}
