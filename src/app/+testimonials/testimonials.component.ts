import { Component, OnInit } from '@angular/core';
import { ContentfulService, Testimonial } from '../shared/contentful.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'sn-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

  testimonials: Testimonial[] = [];

  placeholderImage = {
    url: this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/testimonial-placeholder.png'),
    name: 'Sustainable Nutrition Logo'
  };

  constructor(private content: ContentfulService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.content.testimonials
      .map(testimonials => testimonials.map(testimonial => {
        testimonial.beforeImage = testimonial.beforeImage || this.placeholderImage;
        testimonial.afterImage = testimonial.afterImage || this.placeholderImage;
        return testimonial;
      }))
      .subscribe(testimonials => {
      this.testimonials = testimonials;
    });
  }

  testimonialTrackBy(index: number, testimonial: Testimonial) {
    return testimonial.contentID;
  }
}
