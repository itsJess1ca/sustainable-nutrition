import { WindowSize } from './shared/window-resize.service';
import { ContentfulService } from './shared/contentful.service';
import { Marked } from './shared/marked.service';

export const APP_PROVIDERS = [
  ContentfulService,
  WindowSize,
  Marked
];
