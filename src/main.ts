import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
import { installServiceWorker } from './app/shared/sw-install';

if (environment.production) {
  enableProdMode();
  installServiceWorker();
}

platformBrowserDynamic().bootstrapModule(AppModule);
