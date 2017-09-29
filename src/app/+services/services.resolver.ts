import { Injectable } from '@angular/core';
import { Service, ContentfulService } from '../shared/contentful.service';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Marked } from '../shared/marked.service';

@Injectable()
export class ServicesResolver implements Resolve<[Service[], {pageDescription: string, pageDescriptionHeader: string}]> {
  constructor(private contentful: ContentfulService, private router: Router, private marked: Marked) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<[Service[], {pageDescription: string, pageDescriptionHeader: string}]> {
    console.log('resolving services');
    return Promise.all([
      this.contentful.services.toPromise(),
      this.contentful.getEntry('hTakAAee4wUkyW2goK6kG').map((data: any) => {
        data.fields.pageDescription = this.marked.transform(data.fields.pageDescription);
        data.fields.pageDescriptionHeader = this.marked.transform(data.fields.pageDescriptionHeader);
        return data.fields;
      }).toPromise()
    ]);
  }
}
