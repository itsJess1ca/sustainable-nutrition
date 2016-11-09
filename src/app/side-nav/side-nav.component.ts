import { Component, OnInit, Input, ElementRef, Renderer, ViewChild } from '@angular/core';

@Component({
  selector: 'sn-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  host: {
    '[class.visible]': 'visible'
  }
})
export class SideNavComponent implements OnInit {
  @Input() Routes: any;
  @ViewChild('sidenav') sidenav: ElementRef;

  visible: boolean = false;
  animatableSidenav: boolean = false;

  startX: number = 0;
  currentX: number = 0;

  constructor(
    private renderer: Renderer
  ) {}

  ngOnInit() {
  }

  open() {
    this.animatableSidenav = true;
    this.visible = true;
  }
  close() {
    this.animatableSidenav = true;
    this.visible = false;
  }

  onTransitionEnd(event) {
    this.animatableSidenav = false;
  }

  touchStart(event) {
    if (!this.visible) return;

    this.startX = event.touches[0].pageX;
    this.currentX = this.startX;
  }

  touchMove(event) {
    this.currentX = event.touches[0].pageX;
    const translateX = Math.min(0, this.currentX - this.startX);

    if (translateX < 0) {
      event.preventDefault();
    }

    this.renderer.setElementStyle(this.sidenav.nativeElement, 'transform', `translate(${translateX}px)`)
  }

  touchEnd(event) {
    const translateX = Math.min(0, this.currentX - this.startX);

    if (translateX < -100) {
      this.renderer.setElementStyle(this.sidenav.nativeElement, 'transform', '');
      this.close();
    } else if (translateX > -150 && translateX < 0) {
      this.renderer.setElementStyle(this.sidenav.nativeElement, 'transform', 'initial');
    }
  }
}
