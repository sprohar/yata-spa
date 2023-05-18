import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[sidenavItem]',
  standalone: true,
})
export class SidenavItem {
  @Output() readonly close = new EventEmitter<void>();

  constructor() {}

  @HostListener('click')
  handleClick() {
    this.close.emit();
  }
}
