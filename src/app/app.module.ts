import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FooterModule } from './footer/footer.module';
import { BrandLogoModule } from './brand-logo/brand-logo.module';
import { IconButtonModule } from './shared/icon-button/icon-button.module';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [
    SideNavComponent,
    AppComponent
  ],
  imports: [
    IconButtonModule,
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
