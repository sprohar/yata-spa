import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Task } from '../../../models';
import { TasksService } from '../../../services/http';
import { selectCurrentProjectId } from '../../../store/selectors';

@Component({
  selector: 'yata-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskSearchComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  resultSet$?: Observable<Task[]>;
  currentProjectId?: number;
  form!: FormGroup;

  @ViewChild('input')
  inputElement?: ElementRef;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly tasksService: TasksService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.initForm();

    this.store
      .select(selectCurrentProjectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: number | null) => {
        if (value) this.currentProjectId = value;
      });

    this.resultSet$ = this.query.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query: string) =>
        this.tasksService.search({
          query,
          projectId: this.currentProjectId,
        })
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

  private initForm() {
    this.form = this.fb.group({
      query: this.fb.control('', {
        validators: [Validators.minLength(1)],
        nonNullable: true,
      }),
    });
  }

  handleSelectedOption(taskId: number) {
    this.router.navigate(['tasks', taskId], { relativeTo: this.route });
  }

  handleClearInput() {
    this.resultSet$ = undefined;
    this.query.setValue('', { emitEvent: false, onlySelf: true });
  }

  get query() {
    return this.form.get('query') as FormControl;
  }
}
