import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Priority, Task } from '../../../models';
import { TasksService } from '../../../services/http';
import { selectCurrentProjectId, selectTasks } from '../../../store/selectors';
import { TaskPriorityPipe } from '../../pipes/task-priority.pipe';

export enum SearchScope {
  /**
   * Limit the search to the current project.
   */
  Project,
  /**
   * Search across all the user's projects.
   */
  Universal,
}

@Component({
  selector: 'yata-search-dialog',
  standalone: true,
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    TaskPriorityPipe,
  ],
})
export class SearchDialogComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  readonly searchScope = SearchScope;
  readonly taskPriority = Priority;
  readonly tasks$ = this.store.select(selectTasks);
  readonly form = this.fb.group({
    scope: this.fb.control<SearchScope>(SearchScope.Project),
    priority: this.fb.control<Priority>(Priority.ALL),
    query: this.fb.control<string>('', {
      // validators: [Validators.minLength(1)],
      nonNullable: true,
    }),
    range: this.fb.group({
      start: this.fb.control<Date | null>(null),
      end: this.fb.control<Date | null>(null),
    }),
  });

  @ViewChild('input') input!: ElementRef;
  currentProjectId: number | null = null;

  results$?: Observable<Task[]>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private readonly dialogRef: MatDialogRef<SearchDialogComponent>,
    private readonly router: Router,
    private readonly tasksService: TasksService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.store
      .select(selectCurrentProjectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.currentProjectId = value));
  }

  trackByTaskId(_index: number, task: Task) {
    return task.id!;
  }

  handleSelectedOption(taskId: number) {
    this.router
      .navigateByUrl(`${this.router.url}/tasks/${taskId}`)
      .then(() => this.dialogRef.close());
  }

  handleInput(query: string) {
    if (this.scope.value === SearchScope.Project) {
      this.results$ = this.tasks$.pipe(
        map((tasks) => this.filterTasks(query, tasks))
      );
    } else {
      this.results$ = this.tasksService.search({
        query,
        priority: this.priority.value,
        start: this.start.value,
        end: this.end.value,
      });
    }
  }

  get priority() {
    return this.form.get('priority') as FormControl<Priority>;
  }

  get range() {
    return this.form.get('range') as FormGroup;
  }

  get start() {
    return this.range.get('start') as FormControl<Date | null>;
  }

  get end() {
    return this.range.get('end') as FormControl<Date | null>;
  }

  get query() {
    return this.form.get('query') as FormControl<string>;
  }

  get scope() {
    return this.form.get('scope') as FormControl<SearchScope>;
  }

  filterTasks(query: string, tasks: Task[]) {
    return tasks.filter((task) => {
      if (query && !task.title.toLowerCase().startsWith(query.toLowerCase())) {
        return false;
      }
      if (this.currentProjectId && task.projectId !== this.currentProjectId) {
        return false;
      }
      if (
        this.priority.value !== Priority.ALL &&
        task.priority !== this.priority.value
      ) {
        return false;
      }
      if (this.start.value && this.end.value && task.dueDate) {
        const dueDate = new Date(task.dueDate);
        if (dueDate < this.start.value || dueDate > this.end.value) {
          return false;
        }
      }
      if (
        this.start.value &&
        task.dueDate &&
        new Date(task.dueDate) < this.start.value
      ) {
        return false;
      }
      if (
        this.end.value &&
        task.dueDate &&
        new Date(task.dueDate) > this.end.value
      ) {
        return false;
      }
      return true;
    });
  }
}
