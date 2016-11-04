import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { RouterModule } from '@angular/router';
import { CONTACT_ROUTES } from './contact.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CONTACT_ROUTES)
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
