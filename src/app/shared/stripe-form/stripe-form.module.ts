import { NgModule } from '@angular/core';

import { StripeFormComponent } from './stripe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StripeService } from '../stripe.service';
import { BrandLogoModule } from '../../brand-logo/brand-logo.module';

@NgModule({
    imports: [
      BrandLogoModule,
      CommonModule,
      ReactiveFormsModule
    ],
    exports: [StripeFormComponent],
    declarations: [StripeFormComponent],
    providers: [StripeService],
})
export class StripeFormModule { }
