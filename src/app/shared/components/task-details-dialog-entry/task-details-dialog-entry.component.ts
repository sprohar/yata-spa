import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TaskDetailsDialogComponent } from '../task-details-dialog/task-details-dialog.component';

@Component({
  selector: 'yata-task-details-dialog-entry',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsDialogEntryComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const ref = this.dialog.open(TaskDetailsDialogComponent, {
      minWidth: '350px',
      minHeight: '400px',
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const url = this.router.url;
        if (url.includes('matrix')) {
          this.router.navigate(['/app/matrix']);
        } else {
          this.router.navigate(['../..'], { relativeTo: this.route });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
