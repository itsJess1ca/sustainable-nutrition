import { Injectable } from '@angular/core';
import * as Contentful from 'contentful';
import { Observable } from 'rxjs';
import { Marked } from './marked.service';
import { slugify } from '../utils/slugify';

@Injectable()
export class ContentfulService {
  contentful = Contentful.createClient({
    accessToken: '44ffc10f73c328d493af90e8c12e6ea7eeab1a5d73601ede4ac2cea6f32cf5b8',
    space: 'sffpqijb8th2'
  });

  private _coaches: Coach[] = null;
  private _services: Service[] = null;

  constructor(private marked: Marked) {}

  get services(): Observable<Service[]> {
    if (this._services) {
      return Observable.of(this._services);
    } else {
      return this.getEntries({'content_type': 'services'})
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
      return this.getEntries({'content_type': 'coaches'})
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

  getEntries(query: EntriesQuery): Observable<any[]> {
    return Observable
      .fromPromise(new Promise(resolve => {
        this.contentful.getEntries(query).then((entries) => resolve(entries));
      }))
      .map((entries: any) => entries.items.map(e => {
        let r = e.fields;
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

  // Testimonials
  getTestimonials(): Observable<any> {
    return this.getEntries({content_type: 'testimonials'})
      .map(testimonials => testimonials.map((testimonial: any) => {
        testimonial.content = this.marked.transform(testimonial.content);
        return testimonial;
      }))
      .distinctUntilChanged();
  }

  getRandomTestimonial(): Observable<any> {
    return this.getTestimonials()
      .map(testimonials => testimonials[Math.floor(Math.random() * testimonials.length)]);
  }

  getService(serviceID: number): Observable<Service> {
    return this.services
      .map((services) =>
        services.filter((svc) => svc.id === serviceID)[0]);
  }
}

export interface Service {
  cost: string;
  description: string;
  fieldType: 'service';
  id: number;
  image: {
    name: string;
    url: string;
  };
  summary: string;
  title: string;
  isService: boolean;
}

export interface Coach {
  emailAddress: string;
  fieldType: 'coaches';
  firstName: string;
  lastName: string;
  shortDescription: string;
  telephoneNumber: string;
}


