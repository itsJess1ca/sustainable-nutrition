import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sn-testimonials',
  templateUrl: 'testimonials-bucket.component.html',
  styleUrls: ['testimonials-bucket.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsBucketComponent implements OnInit {
  @Input() testimonial: any;

  constructor() { }

  ngOnInit() {

  }
}
