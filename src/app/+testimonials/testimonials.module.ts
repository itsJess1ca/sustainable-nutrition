import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsComponent } from './testimonials.component';
import { RouterModule } from '@angular/router';
import { TESTIMONIALS_ROUTES } from './testimonials.routes';
import { PageTitleModule } from '../shared/page-title/page-title.module';
import { TestimonialComponent } from './testimonial/testimonial.component';

@NgModule({
  imports: [
    CommonModule,
    PageTitleModule,
    RouterModule.forChild(TESTIMONIALS_ROUTES)
  ],
  declarations: [
    TestimonialComponent,
    TestimonialsComponent
  ]
})
export class TestimonialsModule { }
