import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { RouterModule } from '@angular/router';
import { BLOG_ROUTES } from './blog.routes';
import { PageTitleModule } from '../shared/page-title/page-title.module';
import { MediumService } from '../shared/medium.service';

@NgModule({
  imports: [
    PageTitleModule,
    CommonModule,
    RouterModule.forChild(BLOG_ROUTES)
  ],
  declarations: [BlogComponent],
  providers: [MediumService]
})
export class BlogModule { }
