import { Directive, OnInit, Renderer, ElementRef, AfterViewInit } from '@angular/core';
import { WindowSize } from '../window-resize.service';
import { Subscription } from 'rxjs';
@Directive({
  selector: '[viewportHeight]'
})
export class ViewportHeightDirective implements OnInit, AfterViewInit {
  heightSub: Subscription;
  currentHeight: number = 0;

  constructor(private renderer: Renderer, private el: ElementRef, private screenSize: WindowSize) {

  }

  ngOnInit() {
    this.heightSub = this.screenSize.height$.subscribe((height: number) => {
      if (height > this.currentHeight + 60) {
        this.currentHeight = Math.max(height, 500);
        this.adjustSize(this.currentHeight);
      }
    });
  }

  ngAfterViewInit() {
  }

  adjustSize(height: number) {
    this.renderer.setElementStyle(this.el.nativeElement, 'min-height', `${height}px`);
  }
}
