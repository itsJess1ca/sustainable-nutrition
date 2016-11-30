import { RouterModule, PreloadAllModules } from '@angular/router';

import { routes } from './app.routing';
import { FooterModule } from './footer/footer.module';
import { BrandLogoModule } from './brand-logo/brand-logo.module';
import { IconButtonModule } from './shared/icon-button/icon-button.module';
import { ViewportHeightModule } from './shared/viewport-height/viewport-height.module';

export const APP_IMPORTS = [
  ViewportHeightModule,
  IconButtonModule,
  BrandLogoModule,
  FooterModule,
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
];

