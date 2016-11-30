import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesBucketComponent } from './services-bucket.component';
import { BorderedHeaderModule } from '../../shared/bordered-header/bordered-header.module';
import { ServiceComponent } from './service/service.component';

@NgModule({
  imports: [
    BorderedHeaderModule,
    CommonModule
  ],
  declarations: [
    ServiceComponent,
    ServicesBucketComponent
  ],
  exports: [ServicesBucketComponent]
})
export class ServicesBucketModule { }
