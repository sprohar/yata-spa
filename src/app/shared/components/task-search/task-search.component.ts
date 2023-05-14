import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Task } from '../../../models';
import { BreakpointService } from '../../../services';
import { selectCurrentProjectId, selectTasks } from '../../../store/selectors';

@Component({
  selector: 'yata-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    NgFor,
    MatOptionModule,
    AsyncPipe,
  ],
})
export class TaskSearchComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly isHandset$ = this.breakpointService.isHandset$;
  readonly control = new FormControl<string>('', {
    validators: [Validators.minLength(1)],
    nonNullable: true,
  });

  resultSet$?: Observable<Task[]>;
  currentProjectId?: number;

  @ViewChild('input')
  inputElement?: ElementRef;

  constructor(
    private readonly breakpointService: BreakpointService,
    private readonly store: Store,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.store
      .select(selectCurrentProjectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: number | null) => {
        if (value) this.currentProjectId = value;
      });

    this.resultSet$ = this.control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query: string) =>
        this.store
          .select(selectTasks)
          .pipe(
            map((tasks) =>
              tasks.filter((task) => task.title.toLowerCase().startsWith(query))
            )
          )
      )
    );
  }

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }

  @HostListener('document:keydown./')
  addKeyboardShortcutListener() {
    if (this.inputElement) this.inputElement.nativeElement.focus();
    return false;
  }

  handleSelectedOption(taskId: number) {
    this.control.setValue('', {
      emitEvent: false,
    });
    this.router.navigateByUrl(`${this.router.url}/tasks/${taskId}`);
  }

  handleClearInput() {
    this.control.reset();
  }
}
