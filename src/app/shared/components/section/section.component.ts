import { Component, Input } from '@angular/core';

@Component({
  selector: 'yata-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  @Input() name?: string | null;
  @Input() itemsCount?: number;
  expanded = true;

  constructor() {}

  toggleExpanded() {
    this.expanded = !this.expanded;
  }
}
