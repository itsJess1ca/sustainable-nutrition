import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ServiceRouting } from './service.routing';
import { ServiceComponent } from './service.component';
import { PageTitleModule } from '../shared/page-title/page-title.module';
import { StripeFormModule } from '../shared/stripe-form/stripe-form.module';
import { BorderedHeaderModule } from '../shared/bordered-header/bordered-header.module';

@NgModule({
  imports: [
    BorderedHeaderModule,
    StripeFormModule,
    PageTitleModule,
    CommonModule,
    ServiceRouting
  ],
  providers: [],
  declarations: [
    ServiceComponent
  ],
  exports: []
})
export class ServiceModule {

}
