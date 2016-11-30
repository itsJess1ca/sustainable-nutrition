import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachesBucketComponent } from './coaches-bucket.component';
import { BorderedHeaderModule } from '../../shared/bordered-header/bordered-header.module';

@NgModule({
  imports: [
    BorderedHeaderModule,
    CommonModule
  ],
  declarations: [CoachesBucketComponent],
  exports: [CoachesBucketComponent]
})
export class CoachesBucketModule { }
