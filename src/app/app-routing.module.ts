import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LazyRoute } from './lazy-route';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => System.import(`./+home/home.module`).then((comp: any) => {
      return comp['HomeModule']
    })
  },
  {path: 'home', pathMatch: 'full', redirectTo: '/'},
  LazyRoute('+services', 'services.module', 'ServicesModule', 'services'),
  LazyRoute('+coaches', 'coaches.module', 'CoachesModule', 'coaches'),
  LazyRoute('+testimonials', 'testimonials.module', 'TestimonialsModule', 'testimonials'),
  LazyRoute('+contact', 'contact.module', 'ContactModule', 'contact')
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
