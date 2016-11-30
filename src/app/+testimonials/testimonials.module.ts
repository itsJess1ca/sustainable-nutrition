import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsComponent } from './testimonials.component';
import { RouterModule } from '@angular/router';
import { TESTIMONIALS_ROUTES } from './testimonials.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TESTIMONIALS_ROUTES)
  ],
  declarations: [TestimonialsComponent]
})
export class TestimonialsModule { }
