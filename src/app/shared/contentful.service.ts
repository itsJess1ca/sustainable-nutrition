import { Injectable, NgZone } from '@angular/core';
import * as Contentful from 'contentful';
import { Observable } from 'rxjs';

@Injectable()
export class ContentfulService {
  contentful = Contentful.createClient({
    accessToken: 'a51358aa8ae36aa962c9bfceafd6ad1eabdd6d962ec05ac6df0664dc74c689b4',
    space: '5o14xo9vvej5'
  });

  constructor(private zone: NgZone) {}

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
    return this.getEntries({content_type: 'testimonials'}).distinctUntilChanged();
  }

  getRandomTestimonial(): Observable<any> {
    return this.getTestimonials()
      .map(testimonials => testimonials[Math.floor(Math.random() * testimonials.length)]);
  }
}


