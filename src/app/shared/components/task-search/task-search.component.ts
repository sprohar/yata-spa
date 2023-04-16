import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
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
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Task } from '../../../models';
import { TasksService } from '../../../services';
import { selectCurrentProjectId } from '../../../store/selectors';

@Component({
  selector: 'yata-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskSearchComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  private shortcutKeyHandler?: ReturnType<typeof this.renderer.listen>;
  resultSet$?: Observable<Task[]>;
  currentProjectId?: number;
  isFocused = false;
  form!: FormGroup;

  @ViewChild('searchInput')
  searchInput?: ElementRef;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    if (this.shortcutKeyHandler) this.shortcutKeyHandler();
  }

  ngOnInit(): void {
    this.initForm();
    this.store
      .select(selectCurrentProjectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: number | null) => {
        if (value) this.currentProjectId = value;
      });

    this.addKeyboardShortcutListener();
  }

  private addKeyboardShortcutListener() {
    this.shortcutKeyHandler = this.renderer.listen(
      'document',
      'keydown',
      (event: KeyboardEvent) => {
        if (event.key === '/') {
          event.preventDefault();
          if (this.searchInput) {
            this.searchInput.nativeElement.focus();
          }
        }
      }
    );
  }

  private initForm() {
    this.form = this.fb.group({
      query: ['', [Validators.minLength(1)]],
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

  handleSelectedOption(taskId: number) {
    this.router.navigate(['tasks', taskId], { relativeTo: this.route });
    this.query.setValue('', { emitEvent: false, onlySelf: true });
  }

  handleFocus() {
    this.isFocused = true;
    if (this.shortcutKeyHandler) {
      this.shortcutKeyHandler();
    }
  }

  handleBlur() {
    this.isFocused = false;
    this.query.setValue('', { emitEvent: false, onlySelf: true });
    this.addKeyboardShortcutListener();
  }

  get query() {
    return this.form.get('query') as FormControl;
  }
}
