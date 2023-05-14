import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { Section } from '../../../models';
import { selectSections } from '../../../store/selectors';

@Component({
  selector: 'yata-section-picker',
  templateUrl: './section-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgIf,
    NgFor,
    AsyncPipe,
  ],
})
export class SectionPickerComponent {
  @Output() selected = new EventEmitter<Section>();
  readonly sections$ = this.store.select(selectSections);

  constructor(private readonly store: Store) {}

  trackBySectionId(_index: number, section: Section) {
    return section.id;
  }

  handleSelected(section: Section) {
    this.selected.emit(section);
  }
}
