import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { RouterModule } from '@angular/router';
import { SERVICES_ROUTES } from './services.routes';
import { PageTitleModule } from '../shared/page-title/page-title.module';
import { ServiceComponent } from './service/service.component';
import { BorderedHeaderModule } from '../shared/bordered-header/bordered-header.module';
import { StripeFormModule } from '../shared/stripe-form/stripe-form.module';

@NgModule({
  imports: [
    StripeFormModule,
    BorderedHeaderModule,
    CommonModule,
    PageTitleModule,
    RouterModule.forChild(SERVICES_ROUTES)
  ],
  declarations: [
    ServicesComponent,
    ServiceComponent
  ]
})
export class ServicesModule { }
