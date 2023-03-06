import { Component, Input, OnInit } from '@angular/core';
import { Section } from '../../../models';

@Component({
  selector: 'yata-project-section',
  templateUrl: './project-section.component.html',
  styleUrls: ['./project-section.component.scss'],
})
export class ProjectSectionComponent implements OnInit {
  @Input() section!: Section;
  expanded = true;

  constructor() {}

  ngOnInit(): void {
    if (!this.section) {
      throw new Error('"section" is undefined');
    }
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }
}
