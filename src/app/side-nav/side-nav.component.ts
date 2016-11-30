import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Renderer,
  ViewChild,
  NgZone,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'sn-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Input() routes: any;
  @HostBinding('class.visible') visible: boolean = false;
  @ViewChild('sidenav') sidenav: ElementRef;

  animatableSidenav: boolean = false;

  startX: number = 0;
  currentX: number = 0;

  constructor(
    private renderer: Renderer,
    private zone: NgZone
  ) {}

  ngOnInit() {
  }

  open() {
    console.log('sidenav open');
    this.animatableSidenav = true;
    requestAnimationFrame(() => {
      this.visible = true;
    });
  }
  close() {
    this.animatableSidenav = true;
    requestAnimationFrame(() => {
      this.visible = false;
    });
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

    this.zone.runOutsideAngular(() => {
      this.currentX = event.touches[0].pageX;
      const translateX = Math.min(0, this.currentX - this.startX);

      if (translateX < 0) {
        event.preventDefault();
      }

      requestAnimationFrame(() => {
          this.renderer
            .setElementStyle(this.sidenav.nativeElement, 'transform', `translate(${translateX}px)`);
      });

    });
  }

  touchEnd(event) {
    const translateX = Math.min(0, this.currentX - this.startX);

    if (translateX < -100) {

      requestAnimationFrame(() => {
        this.renderer.setElementStyle(this.sidenav.nativeElement, 'transform', '');
        this.close();
      });
    } else if (translateX > -150 && translateX < 0) {

      requestAnimationFrame(() => {
        this.renderer.setElementStyle(this.sidenav.nativeElement, 'transform', 'initial');
      });
    }
  }
}
