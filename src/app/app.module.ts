import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FooterModule } from './footer/footer.module';
import { BrandLogoModule } from './brand-logo/brand-logo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrandLogoModule,
    FooterModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
