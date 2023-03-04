import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClickableDirective } from './clickable.directive';

@Component({
  selector: 'yata-test',
  template: `
    <div yataClickable id="clickable">
      <p>Testing 1,2,3</p>
    </div>
  `,
})
class TestComponent {
  constructor() {}
}

describe('ClickableDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, ClickableDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(TestComponent);

    fixture.detectChanges(); // initial binding
  });

  it('should have the "clickable" css class', () => {
    const element: HTMLElement = fixture.nativeElement;
    const clickableElement = element.querySelector('#clickable');
    expect(clickableElement!.classList.contains('clickable')).toBeTrue();
  });
});
