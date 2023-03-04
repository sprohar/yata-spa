import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[yataClickable]',
})
export class ClickableDirective {
  constructor(private elementRef: ElementRef) {
    const element: HTMLElement = this.elementRef.nativeElement;
    if (!element.classList.contains('clickable')) {
      element.classList.add('clickable');
    }
  }
}
