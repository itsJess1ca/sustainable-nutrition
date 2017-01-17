import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachesBucketComponent } from './coaches-bucket.component';
import { BorderedHeaderModule } from '../../shared/bordered-header/bordered-header.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    BorderedHeaderModule,
    CommonModule
  ],
  declarations: [CoachesBucketComponent],
  exports: [CoachesBucketComponent]
})
export class CoachesBucketModule { }
