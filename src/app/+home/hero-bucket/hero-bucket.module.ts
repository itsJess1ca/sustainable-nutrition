import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBucketComponent } from './hero-bucket.component';
import { BorderedHeaderModule } from '../../shared/bordered-header/bordered-header.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { NewLinePipe } from '../../shared/new-line.pipe';

@NgModule({
  imports: [
    BorderedHeaderModule,
    CommonModule,
    Ng2PageScrollModule
  ],
  declarations: [
    HeroBucketComponent,
    NewLinePipe
  ],
  exports: [HeroBucketComponent]
})
export class HeroBucketModule { }
