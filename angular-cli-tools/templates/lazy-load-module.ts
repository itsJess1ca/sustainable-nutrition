import { NgModule }      from '@angular/core';
import { $PascalCaseName$Routing } from './$name$.routing';
import { $PascalCaseName$Component } from './$name$.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    $PascalCaseName$Routing
  ],
  providers: [],
  declarations: [
    $PascalCaseName$Component
  ],
  exports: []
})
export class $PascalCaseName$Module {

}
