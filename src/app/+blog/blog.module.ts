import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { RouterModule } from '@angular/router';
import { BLOG_ROUTES } from './blog.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BLOG_ROUTES)
  ],
  declarations: [BlogComponent]
})
export class BlogModule { }
