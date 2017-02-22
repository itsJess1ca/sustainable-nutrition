import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { RouterModule } from '@angular/router';
import { CONTACT_ROUTES } from './contact.routes';
import { PageTitleModule } from '../shared/page-title/page-title.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    PageTitleModule,
    CommonModule,
    RouterModule.forChild(CONTACT_ROUTES)
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
