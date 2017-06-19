import { Component, Renderer, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: '[bordered-header]',
  styleUrls: ['bordered-header.component.css'],
  template: `<div class="ripple-container"><div class="ripple"></div></div><ng-content></ng-content>`
})
export class BorderedHeaderComponent {
  isAlive: boolean = false;
  @Input() hoverEffect: boolean = true;

  @HostListener('mouseover') onMouseOver() {
    if (this.hoverEffect) this.renderer.setElementClass(this.el.nativeElement.querySelector('.ripple'), 'active', true);
  }
  @HostListener('mouseleave') onMouseLeave() {
    if (this.hoverEffect) this.clearRipple();
  }

  constructor(private el: ElementRef, private renderer: Renderer) {}


  clearRipple(): void {
    this.renderer.setElementClass(this.el.nativeElement.querySelector('.ripple'), 'active', false);
  }
}
