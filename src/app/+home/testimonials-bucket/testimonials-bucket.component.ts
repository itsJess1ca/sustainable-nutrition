import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sn-testimonials',
  templateUrl: 'testimonials-bucket.component.html',
  styleUrls: ['testimonials-bucket.component.css']
})
export class TestimonialsBucketComponent implements OnInit {

  testimonials: any[] = [
    {
      content: 'Sustainable Nutrition\'s Programmes are great. They really know their stuff!',
      author: 'Joanna Bloggs'
    },
    {
      content: 'Couldn\'t have made it easier. Great experience. Thanks James!',
      author: 'Joe Smith'
    }
  ];

  activeTestimonial = this.testimonials[Math.floor(Math.random() * this.testimonials.length)];

  constructor() { }

  ngOnInit() {
  }


}
