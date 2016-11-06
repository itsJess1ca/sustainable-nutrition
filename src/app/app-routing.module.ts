import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: 'app/+home/home.module#HomeModule'},
  { path: 'home', pathMatch: 'full', redirectTo: '/'},
  { path: 'services', pathMatch: 'full', loadChildren: 'app/+services/services.module#ServicesModule'},
  { path: 'coaches', pathMatch: 'full', loadChildren: 'app/+coaches/coaches.module#CoachesModule'},
  { path: 'testimonials', pathMatch: 'full', loadChildren: 'app/+testimonials/testimonials.module#TestimonialsModule'},
  { path: 'contact', pathMatch: 'full', loadChildren: 'app/+contact/contact.module#ContactModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
