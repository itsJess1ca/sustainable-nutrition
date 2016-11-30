import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HOME_ROUTES } from './home.routes';
import { RouterModule } from '@angular/router';
import { BrandLogoModule } from '../brand-logo/brand-logo.module';
import { BorderedHeaderModule } from '../shared/bordered-header/bordered-header.module';

// buckets
import { HeroBucketModule } from './hero-bucket/hero-bucket.module';
import { DetailsBucketModule } from './details-bucket/details-bucket.module';
import { ServicesBucketModule } from './services-bucket/services-bucket.module';
import { CoachesBucketModule } from './coaches-bucket/coaches-bucket.module';
import { TestimonialsBucketModule } from './testimonials-bucket/testimonials-bucket.module';
import { ViewportHeightModule } from '../shared/viewport-height/viewport-height.module';

@NgModule({
  imports: [
    ViewportHeightModule,
    TestimonialsBucketModule,
    CoachesBucketModule,
    ServicesBucketModule,
    DetailsBucketModule,
    HeroBucketModule,
    BorderedHeaderModule,
    BrandLogoModule,
    CommonModule,
    RouterModule.forChild(HOME_ROUTES)
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
