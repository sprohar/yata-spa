import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Section } from '../../../models';
import { ConfirmationDialogService } from '../../../services/confirmation-dialog.service';
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
    private confirmationDialog: ConfirmationDialogService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    if (!this.section) {
      throw new Error('"section" is undefined.');
    }
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
