import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachesComponent } from './coaches.component';
import { RouterModule } from '@angular/router';
import { COACHES_ROUTES } from './coaches.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(COACHES_ROUTES)
  ],
  declarations: [CoachesComponent]
})
export class CoachesModule { }
