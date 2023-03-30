import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

enum Frequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

interface FrequencySelectOption {
  frequency: Frequency;
  selectOptionText: string;
}

@Component({
  selector: 'yata-create-custom-recurrence-dialog',
  templateUrl: './create-custom-recurrence-dialog.component.html',
  styleUrls: ['./create-custom-recurrence-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomRecurrenceDialogComponent implements OnInit {
  readonly frequencySelectOptions: FrequencySelectOption[] = [
    { frequency: Frequency.DAILY, selectOptionText: 'day(s)' },
    { frequency: Frequency.WEEKLY, selectOptionText: 'week(s)' },
    {
      frequency: Frequency.MONTHLY,
      selectOptionText: 'month(s)',
    },
    { frequency: Frequency.YEARLY, selectOptionText: 'year(s)' },
  ];
  readonly MIN_END_DATE = new Date();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateCustomRecurrenceDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      frequency: [Frequency.DAILY, [Validators.required]],
      interval: [1, [Validators.required]],
      isInfinite: [true],
      isFinite: [false],
      hasEndDate: [false],
      occurrences: this.fb.control(
        {
          value: '',
          disabled: true,
        },
        { validators: [Validators.required] }
      ),
      endDate: this.fb.control({
        value: null,
        disabled: true,
      }),
    });
  }

  get frequencyControl() {
    return this.form.get('frequency') as FormControl;
  }

  get intervalControl() {
    return this.form.get('interval') as FormControl;
  }

  get isInfiniteControl() {
    return this.form.get('isInfinite') as FormControl;
  }

  get isFiniteControl() {
    return this.form.get('isFinite') as FormControl;
  }

  get hasEndDateControl() {
    return this.form.get('hasEndDate') as FormControl;
  }

  get occurrencesControl() {
    return this.form.get('occurrences') as FormControl;
  }

  get endDateControl() {
    return this.form.get('endDate') as FormControl;
  }

  handleIsInfiniteChange(value: boolean) {
    this.form.patchValue({
      isInfinite: value,
      isFinite: !value,
      hasEndDate: !value,
    });
    if (value) {
      this.endDateControl.disable();
      this.occurrencesControl.disable();
    }
  }

  handleIsFiniteChange(value: boolean) {
    this.form.patchValue({
      isFinite: value,
      isInfinite: !value,
      hasEndDate: !value,
    });
    if (value) {
      this.endDateControl.disable();
      this.occurrencesControl.enable();
    }
  }

  handleHasEndDateChange(value: boolean) {
    this.form.patchValue({
      hasEndDate: value,
      isInfinite: !value,
      isFinite: !value,
    });
    if (value) {
      this.endDateControl.enable();
      this.occurrencesControl.disable();
    }
  }

  handleSave() {
    const isInfinite: boolean = this.isInfiniteControl.value;
    const hasEndDate: boolean = this.hasEndDateControl.value;
    const frequency: Frequency = this.frequencyControl.value;
    const interval = parseInt(this.intervalControl.value);
    const count = parseInt(this.occurrencesControl.value);
    // const rrule = new RRule({
    //   frequency,
    //   interval,
    //   count,
    //   isInfinite: true,
    // });
    
    this.dialogRef.close();
  }
}
