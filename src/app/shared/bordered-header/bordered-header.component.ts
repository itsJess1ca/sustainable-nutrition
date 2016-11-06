import { Component, Input, OnInit, OnChanges, Renderer, ElementRef } from '@angular/core';

@Component({
  selector: '[bordered-header]',
  styleUrls: ['bordered-header.component.scss'],
  template: `<div class="ripple"></div><ng-content></ng-content>`,
  host: {
    '(mouseover)': 'onMouseOver($event)',
    '(mouseleave)': 'onMouseLeave($event)'
  }
})
export class BorderedHeaderComponent {
  isAlive: boolean = false;
  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) {}

  onMouseOver(event): void {
    this.renderer.setElementClass(this.el.nativeElement.querySelector('.ripple'), 'active', true);
  }
  onMouseLeave(event): void {
    this.clearRipple();
  }
  clearRipple(): void {
    this.renderer.setElementClass(this.el.nativeElement.querySelector('.ripple'), 'active', false);
  }
}
