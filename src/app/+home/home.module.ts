import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HOME_ROUTES } from './home.routes';
import { RouterModule } from '@angular/router';
import { BrandLogoModule } from '../brand-logo/brand-logo.module';
import { BorderedHeaderModule } from '../shared/bordered-header/bordered-header.module';

@NgModule({
  imports: [
    BorderedHeaderModule,
    BrandLogoModule,
    CommonModule,
    RouterModule.forChild(HOME_ROUTES)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
