import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsBucketComponent } from './details-bucket.component';
import { BorderedHeaderModule } from '../../shared/bordered-header/bordered-header.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

@NgModule({
  imports: [
    BorderedHeaderModule,
    CommonModule,
    Ng2PageScrollModule
  ],
  declarations: [DetailsBucketComponent],
  exports: [DetailsBucketComponent]
})
export class DetailsBucketModule { }
