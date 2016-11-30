import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { RouterModule } from '@angular/router';
import { SERVICES_ROUTES } from './services.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SERVICES_ROUTES)
  ],
  declarations: [ServicesComponent]
})
export class ServicesModule { }
