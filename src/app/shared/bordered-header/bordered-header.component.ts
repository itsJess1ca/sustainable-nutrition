import { Component, Renderer, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: '[bordered-header]',
  styleUrls: ['bordered-header.component.css'],
  template: `<div class="ripple"></div><ng-content></ng-content>`
})
export class BorderedHeaderComponent {
  isAlive: boolean = false;

  @HostListener('mouseover') onMouseOver() {
    this.renderer.setElementClass(this.el.nativeElement.querySelector('.ripple'), 'active', true);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.clearRipple();
  }

  constructor(private el: ElementRef, private renderer: Renderer) {}


  clearRipple(): void {
    this.renderer.setElementClass(this.el.nativeElement.querySelector('.ripple'), 'active', false);
  }
}
