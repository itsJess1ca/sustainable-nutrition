/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';
import { NotFound404Component } from './not-found404.component';
import { ServiceResolver } from './+service/service.resolver';

export const routes: Routes = [
  // Home
  { path: '', pathMatch: 'full', loadChildren: './+home/home.module#HomeModule'},
  { path: 'home', pathMatch: 'full', redirectTo: '/' },

  { path: 'services', loadChildren: './+services/services.module#ServicesModule' },

  { path: 'services/:service', loadChildren: './+service/service.module#ServiceModule', resolve: {service: ServiceResolver} },

  { path: 'coaches', loadChildren: './+coaches/coaches.module#CoachesModule' },

  { path: 'blog', loadChildren: './+blog/blog.module#BlogModule' },

  { path: 'testimonials', loadChildren: './+testimonials/testimonials.module#TestimonialsModule' },

  { path: 'contact', loadChildren: './+contact/contact.module#ContactModule' },

  { path: '**', component: NotFound404Component }
];
