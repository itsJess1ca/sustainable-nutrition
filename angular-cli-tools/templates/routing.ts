import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Example: import { TestComponent }      from './test.component';

const routes: Routes = [
  //Example: {path: 'test', component: TestComponent},
];

export const $PascalCaseName$Routing: ModuleWithProviders = RouterModule.forChild(routes);
