import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TimeTokens } from '../../interfaces/time-tokens';
import { TimeStringParser } from '../../util/time-string-parser';
import { TimeStringValidator } from '../../validators/time-string.validator';

@Component({
  selector: 'yata-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
})
export class TimeInputComponent implements OnInit {
  @Input() value?: string;
  @Output() change = new EventEmitter<TimeTokens>();
  @Output() close = new EventEmitter<void>();
  form!: FormGroup;

  isZuluTime = true;
  readonly datetimeFormatter = new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric',
    minute: 'numeric',
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isZuluTime =
      navigator.languages.filter((language: string) => language.indexOf('en'))
        .length === -1;

    this.initForm();
    if (this.value) {
      this.timeControl.setValue(this.value);
    }
  }

  initForm() {
    this.form = this.fb.group({
      time: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required, TimeStringValidator.validate],
      }),
    });
  }

  get timeControl() {
    return this.form.get('time') as FormControl;
  }

  get invalidTimeFormat(): boolean {
    return this.timeControl.hasError(TimeStringValidator.ERROR_KEY);
  }

  get placeholderText(): string {
    return this.isZuluTime ? '13:00' : '9 AM';
  }

  getErrorMessage(): string {
    return 'Invalid time format';
  }

  handleCancel(): void {
    this.close.emit();
  }

  handleAddTime(): void {
    if (this.form.invalid) {
      return;
    }
    
    const time = this.timeControl.value as string;
    const tokens = TimeStringParser.parse(time.trim());
    this.change.emit(tokens);
    this.form.reset();
  }
}
