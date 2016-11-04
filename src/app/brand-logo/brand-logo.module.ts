import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandLogoComponent } from './brand-logo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BrandLogoComponent],
  exports: [BrandLogoComponent]
})
export class BrandLogoModule { }
