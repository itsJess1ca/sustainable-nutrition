import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';

const ROUTES: Routes = [
    { path: '', component: ServiceComponent },
];

export const ServiceRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
