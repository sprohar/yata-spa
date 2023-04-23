import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreferencesOption } from '../../models';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'yata-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSettingsComponent implements OnInit {
  readonly keys = PreferencesOption;
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly preferences: PreferencesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      todayDefaultDueDate: [
        this.preferences.get(this.keys.DEFAULT_DUE_DATE_TODAY) ?? true,
      ],
    });
  }

  handlePreferenceChange(key: PreferencesOption, value: any) {
    this.preferences.set(key, value);
  }
}
