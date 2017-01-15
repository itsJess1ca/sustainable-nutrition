import { Injectable } from '@angular/core';
import * as Contentful from 'contentful';
import { Observable } from 'rxjs';
import { Marked } from './marked.service';
import { slugify } from '../utils/slugify';

@Injectable()
export class ContentfulService {
  contentful = Contentful.createClient({
    accessToken: 'a51358aa8ae36aa962c9bfceafd6ad1eabdd6d962ec05ac6df0664dc74c689b4',
    space: '5o14xo9vvej5'
  });

  private _coaches: Coach[] = null;
  private _services: Service[] = null;

  constructor(private marked: Marked) {}

  get services(): Promise<Service[]> {
    return new Promise((resolve, reject) => {
      if (!this._services) {
        this.getEntries({'content_type': 'service'})
          .map((services) => {
            return services.map((service, index) => {
              return Object.assign({} , service, {
                id: `${slugify(service.title)}${index}`,
                description: this.marked.transform(service.description),
                summary: this.marked.transform(service.summary),
                image: {
                  name: service.image.fields.title,
                  url: service.image.fields.file.url
                }
              });
            });
          })
          .subscribe((services: any[]) => {
          this._services = services;
            resolve(services);
          });
      } else {
        resolve(this._services);
      }
    });
  }

  get coaches(): Promise<Coach[]> {
    return new Promise((resolve, reject) => {
      if (!this._coaches) {
        this.getEntries({'content_type': 'coaches'})
          .map((coaches: any[]) => {
            return coaches.map((coach: any) => {
              coach.shortDescription = this.marked.transform(coach.shortDescription);
              return coach;
            });
          })
          .subscribe(coaches => {
            this._coaches = coaches;
            resolve(coaches);
          });
      } else {
        resolve(this._coaches);
      }
    });
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

  getService(serviceID: number) {
    return new Promise((resolve, reject) => {
      this.services.then((services: Service[]) => {
        const service = services.filter((svc) => svc.id === serviceID)[0];
        if (service) {
          resolve(service);
        } else {
          reject('No service found');
        }
      });
    });
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
}

export interface Coach {
  emailAddress: string;
  fieldType: 'coaches';
  firstName: string;
  lastName: string;
  shortDescription: string;
  telephoneNumber: string;
}


