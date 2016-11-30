import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsBucketComponent } from './testimonials-bucket.component';
import { BorderedHeaderModule } from '../../shared/bordered-header/bordered-header.module';

@NgModule({
  imports: [
    BorderedHeaderModule,
    CommonModule
  ],
  declarations: [TestimonialsBucketComponent],
  exports: [TestimonialsBucketComponent]
})
export class TestimonialsBucketModule { }
