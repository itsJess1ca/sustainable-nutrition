import { WindowSize } from './shared/window-resize.service';
import { ContentfulService } from './shared/contentful.service';
import { Marked } from './shared/marked.service';
import { ServiceResolver } from './+service/service.resolver';

export const APP_PROVIDERS = [
  ServiceResolver,
  ContentfulService,
  WindowSize,
  Marked
];
