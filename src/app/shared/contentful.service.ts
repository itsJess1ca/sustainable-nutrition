import { Injectable } from '@angular/core';
import * as Contentful from 'contentful';
import { Observable } from 'rxjs';
import { Marked } from './marked.service';
import { slugify } from '../utils/slugify';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class ContentfulService {
  contentful = Contentful.createClient({
    accessToken: '44ffc10f73c328d493af90e8c12e6ea7eeab1a5d73601ede4ac2cea6f32cf5b8',
    space: 'sffpqijb8th2'
  });

  private _coaches: Coach[] = null;
  private _services: Service[] = null;
  private _testimonials: RawTestimonial[] = null;

  constructor(private marked: Marked, private sanitizer: DomSanitizer) {}

  get services(): Observable<Service[]> {
    if (this._services) {
      return Observable.of(this._services);
    } else {
      return this.getEntries<RawService>({'content_type': 'services'})
        .map((services) => {
          return services.map((service) => {
            return Object.assign({} , service, {
              id: `${slugify(service.title)}`,
              description: this.marked.transform(service.description),
              summary: this.marked.transform(service.summary),
              image: {
                name: service.image.fields.title,
                url: service.image.fields.file.url
              },
              isService: true
            });
          });
        })
        .do((services: Service[]) => this._services = services);
    }
  }

  get coaches(): Observable<Coach[]> {
    if (this._coaches) {
      return Observable.of(this._coaches);
    } else {
      return this.getEntries<Coach>({'content_type': 'coaches'})
        .map((coaches: any[]) => {
          return coaches.map((coach: any) => {
            coach.shortDescription = this.marked.transform(coach.shortDescription);
            return coach;
          });
        })
        .do((coaches: Coach[]) => {
          this._coaches = coaches;
        });
    }
  }

  get testimonials(): Observable<Testimonial[]> {
    if (this._testimonials) {
      return Observable.of(this._testimonials);
    } else {
      return this.getEntries<RawTestimonial>({'content_type': 'testimonials'})
        .map(testimonials => {
          console.log(testimonials);
          return testimonials.map((testimonial) => {
            return Object.assign({}, testimonial, {
              beforeImage: testimonial.beforeImage && this.convertContentfulImage(testimonial.beforeImage),
              afterImage: testimonial.afterImage && this.convertContentfulImage(testimonial.afterImage),
              content: this.marked.transform(testimonial.content),
              videoUrl: testimonial.videoUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(testimonial.videoUrl.replace('watch?v=', 'embed/')) : null
            });
          });
        })
        .do((testimonials: RawTestimonial[]) => {
          this._testimonials = testimonials;
        });
    }
  }

  getEntries<T>(query: EntriesQuery): Observable<T[]> {
    return Observable
      .fromPromise(new Promise(resolve => {
        this.contentful.getEntries(query).then((entries) => resolve(entries));
      }))
      .map((entries: any) => entries.items.map(e => {
        let r = e.fields;
        r.contentID = e.sys.id;
        r.fieldType = e.sys.contentType.sys.id;
        return r;
      }));
  }

  getEntry(entryID: string): Observable<any> {
    return Observable
      .fromPromise(new Promise(resolve => {
        this.contentful.getEntry(entryID).then(entry => resolve(entry));
      }));
  }

  getRandomTestimonial(): Observable<Testimonial> {
    return this.testimonials
      .map(testimonials => testimonials[Math.floor(Math.random() * testimonials.length)]);
  }

  getService(serviceID: number): Observable<Service> {
    return this.services
      .map((services) =>
        services.filter((svc) => svc.id === serviceID)[0]);
  }

  private convertContentfulImage(image: ContentfulImage): {name: string, url: SafeUrl} {
    return {
      name: image.fields.title,
      url: this.sanitizer.bypassSecurityTrustResourceUrl(image.fields.file.url)
    };
  }
}

export interface ContentfulImage {
  fields: {
    file: {
      contentType: string;
      details: {
        image: {
          height: number;
          width: number;
        }
        size: number;
      }
      fileName: string;
      url: string;
    }
    title: string;
  };
  sys: {
    createdAt: string;
    id: string;
    locale: string;
    revision: number;
    space: {
      sys: {
        id: string;
        linkType: string;
        type: string;
      }
      type: string;
      updatedAt: string;
    }
  };
}
export interface TestimonialCore {
  contentID: string;
  content: string;
  videoUrl?: SafeUrl;
  dateSubmitted: string;
  author: string;
}
export interface RawTestimonial extends TestimonialCore {
  beforeImage: ContentfulImage;
  afterImage: ContentfulImage;
  videoUrl: string;
}
export interface Testimonial extends TestimonialCore {
  beforeImage: {
    name: string;
    url: SafeUrl;
  };
  afterImage: {
    name: string;
    url: SafeUrl;
  };
}
export interface ServiceCore {
  contentID: string;
  cost: string;
  description: string;
  fieldType: 'service';
  id: number;
  summary: string;
  title: string;
  isService: boolean;
}
export interface RawService extends ServiceCore {
  image: ContentfulImage;
}
export interface Service extends ServiceCore {
  image: {
    name: string;
    url: string;
  };
}
export interface Coach {
  contentID: string;
  emailAddress: string;
  fieldType: 'coaches';
  firstName: string;
  lastName: string;
  shortDescription: string;
  telephoneNumber: string;
}


