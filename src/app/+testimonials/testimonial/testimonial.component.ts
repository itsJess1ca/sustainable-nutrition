import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Testimonial } from '../../shared/contentful.service';
import { WindowSize } from '../../shared/window-resize.service';
@Component({
  selector: 'sn-testimonial',
  templateUrl: 'testimonial.component.html',
  styleUrls: ['testimonial.component.css'],
})
export class TestimonialComponent implements OnInit, OnDestroy {
  @Input() testimonial: Testimonial;
  videoSize = {
    height: 325,
    width: 540
  };

  constructor(private windowSize: WindowSize) {

  }

  ngOnInit() {
    console.log(this.testimonial);
    this.windowSize.size$.subscribe(() => {
      const maxWidth = 540;
      const maxHeight = 304;

      const innerWidth = Math.min(maxWidth, (window as any).innerWidth * 0.9);

      this.videoSize.width = innerWidth > 540 ? 540 : innerWidth;
      this.videoSize.height = Math.min(maxHeight, (innerWidth > 540 ? 540 : innerWidth) * 0.5625);
    });
  }

  ngOnDestroy() {

  }
}
