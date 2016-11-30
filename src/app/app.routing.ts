/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';
import { NotFound404Component } from './not-found404.component';

export const routes: Routes = [
  // Home
  { path: '', pathMatch: 'full', loadChildren: './+home/home.module#HomeModule'},
  { path: 'home', pathMatch: 'full', redirectTo: '/' },

  { path: 'services', loadChildren: './+services/services.module#ServicesModule' },

  { path: 'coaches', loadChildren: './+coaches/coaches.module#CoachesModule' },

  { path: 'testimonials', loadChildren: './+testimonials/testimonials.module#TestimonialsModule' },

  { path: 'contact', loadChildren: './+contact/contact.module#ContactModule' },

  { path: '**', component: NotFound404Component }
];