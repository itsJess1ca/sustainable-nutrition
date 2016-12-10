import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachesComponent } from './coaches.component';
import { RouterModule } from '@angular/router';
import { COACHES_ROUTES } from './coaches.routes';
import { PageTitleModule } from '../shared/page-title/page-title.module';
import { CoachComponent } from './coach/coach.component';
import { BorderedHeaderModule } from '../shared/bordered-header/bordered-header.module';

@NgModule({
  imports: [
    CommonModule,
    PageTitleModule,
    BorderedHeaderModule,
    RouterModule.forChild(COACHES_ROUTES)
  ],
  declarations: [
    CoachComponent,
    CoachesComponent
  ]
})
export class CoachesModule { }
