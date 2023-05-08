import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { UserActions } from '../../../../store/actions';
import { selectUser } from '../../../../store/reducers/auth.reducer';

@Component({
  selector: 'yata-edit-username-input',
  templateUrl: './edit-username-input.component.html',
  styleUrls: ['./edit-username-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUsernameInputComponent
  implements OnDestroy, OnInit, AfterViewInit
{
  private readonly destroy$ = new Subject<void>();
  @ViewChild('input') inputElement?: ElementRef;
  @Output() readonly close = new EventEmitter<void>();
  readonly control = new FormControl<string>('', {
    validators: [Validators.required, Validators.maxLength(255)],
  });

  constructor(
    private readonly store: Store,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.store
      .select(selectUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.control.setValue(user?.username ?? '');
      });
  }

  ngAfterViewInit(): void {
    if (this.inputElement) {
      (this.inputElement.nativeElement as HTMLElement).focus();
      this.changeDetector.detectChanges();
    }
  }

  handleSubmit() {
    if (this.control.invalid) return;

    this.store.dispatch(
      UserActions.updateUser({
        user: {
          username: this.control.value as string,
        },
      })
    );

    this.close.emit();
  }

  handleCancel() {
    this.close.emit();
  }
}
