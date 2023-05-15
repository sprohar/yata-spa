import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { CreateTaskDialogComponent } from '../../shared/components/create-task-dialog/create-task-dialog.component';
import { selectCurrentProject } from '../../store/selectors';

@Component({
  selector: 'yata-create-task-fab-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      button {
        position: fixed;
        right: 16px;
        bottom: 16px;
      }
    `,
  ],
  template: `
    <button
      mat-fab
      color="primary"
      aria-label="Create task"
      title="Create task"
      (click)="openDialog()"
    >
      <mat-icon>add</mat-icon>
    </button>
  `,
})
export class CreateTaskFabButtonComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  private currentProject$ = this.store.select(selectCurrentProject);

  constructor(private readonly dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  openDialog(): void {
    this.currentProject$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((project) =>
          this.dialog
            .open(CreateTaskDialogComponent, { data: { project } })
            .afterClosed()
        )
      )
      .subscribe();
  }
}
