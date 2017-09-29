import { NgModule } from '@angular/core';

import { StripeFormComponent } from './stripe-form.component';
import { CommonModule } from '@angular/common';
import { StripeService } from '../stripe.service';
import { BrandLogoModule } from '../../brand-logo/brand-logo.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
      BrandLogoModule,
      CommonModule,
      FormsModule
    ],
    exports: [StripeFormComponent],
    declarations: [StripeFormComponent],
    providers: [StripeService],
})
export class StripeFormModule { }
