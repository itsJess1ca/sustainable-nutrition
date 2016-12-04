import { WindowSize } from './shared/window-resize.service';
import { ContentfulService } from './shared/contentful.service';

export const APP_PROVIDERS = [
  ContentfulService,
  WindowSize
];
