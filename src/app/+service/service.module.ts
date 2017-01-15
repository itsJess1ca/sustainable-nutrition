import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ServiceRouting } from './service.routing';
import { ServiceComponent } from './service.component';
import { PageTitleModule } from '../shared/page-title/page-title.module';

@NgModule({
  imports: [
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
