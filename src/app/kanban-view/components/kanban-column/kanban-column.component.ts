import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Section, Task } from '../../../models';
import { ConfirmationDialogService } from '../../../services/confirmation-dialog.service';
import { EditSectionDialogComponent } from '../../../shared/components/edit-section-dialog/edit-section-dialog.component';
import { KanbanViewActions } from '../../../store/actions';

@Component({
  selector: 'yata-kanban-column',
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
})
export class KanbanColumnComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  @Input() section!: Section;

  constructor(
    private store: Store,
    private confirmationDialog: ConfirmationDialogService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    if (!this.section) {
      throw new Error('"section" is undefined.');
    }
  }

  trackByTaskId(index: number, task: Task) {
    return task.id;
  }

  handleTaskCardDrop(event: CdkDragDrop<Section, Section, Task>) {
    const previousSection: Section = event.previousContainer.data;
    const section: Section = event.container.data;
    if (section.id === previousSection.id) {
      return;
    }

    const task: Task = event.item.data;
    this.store.dispatch(
      KanbanViewActions.moveTaskToSection({
        task: {
          id: task.id,
          projectId: task.projectId,
          sectionId: section.id,
        },
      })
    );
  }

  handleEditColumn() {
    this.store.dispatch(
      KanbanViewActions.setCurrentSectionId({ sectionId: this.section.id! })
    );

    this.dialog.open(EditSectionDialogComponent);
  }

  handleDeleteColumn() {
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
            KanbanViewActions.deleteSection({
              section: this.section,
            })
          );
        }
      });
  }
}
