import { WindowSize } from './shared/window-resize.service';
import { ContentfulService } from './shared/contentful.service';
import { Marked } from './shared/marked.service';
import { ServiceResolver } from './+service/service.resolver';
import { ServicesResolver } from './+services/services.resolver';
import { ContactPageResolver } from './+contact/contact.resolver';
import { BlogResolver } from './+blog/blog.resolver';
import { GraphqlService } from './shared/graphql';

export const APP_PROVIDERS = [
  GraphqlService,
  ServiceResolver,
  BlogResolver,
  ServicesResolver,
  ContactPageResolver,
  ContentfulService,
  WindowSize,
  Marked
];
