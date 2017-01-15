import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';

const routes: Routes = [
    { path: '', component: ServiceComponent },
];

export const ServiceRouting: ModuleWithProviders = RouterModule.forChild(routes);
