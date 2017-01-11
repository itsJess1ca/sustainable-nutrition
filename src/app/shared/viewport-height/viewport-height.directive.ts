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
    console.log('viewport height directive');
    this.heightSub = this.screenSize.size$.subscribe(({height}: {width: number, height: number}) => {
      if (height > this.currentHeight + 60 || height < this.currentHeight - 60) {
        this.currentHeight = Math.max(height - 25, 650);
        this.adjustSize(this.currentHeight);
      }
    });
  }

  ngAfterViewInit() {
  }

  adjustSize(height: number) {
    console.log(`setting min-height to ${height}`);
    this.renderer.setElementStyle(this.el.nativeElement, 'min-height', `${height}px`);
  }
}
