import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Section } from '../../../models';
import { selectSections } from '../../../store/selectors';

@Component({
  selector: 'yata-section-picker',
  templateUrl: './section-picker.component.html',
  styleUrls: ['./section-picker.component.scss']
})
export class SectionPickerComponent {
  @Output() selected = new EventEmitter<Section>();
  sections$ = this.store.select(selectSections);

  constructor(private store: Store) {}

  trackBySectionId(index: number, section: Section) {
    return section.id;
  }

  handleSelected(section: Section){
    this.selected.emit(section);
  }
}
