import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderedHeaderComponent } from './bordered-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BorderedHeaderComponent],
  exports: [BorderedHeaderComponent]
})
export class BorderedHeaderModule {}
