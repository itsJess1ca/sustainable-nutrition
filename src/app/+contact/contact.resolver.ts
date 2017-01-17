import { Injectable } from '@angular/core';
import { Service, ContentfulService } from '../shared/contentful.service';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Marked } from '../shared/marked.service';

@Injectable()
export class ContactPageResolver implements Resolve<Service> {
  constructor(private contentful: ContentfulService, private router: Router, private marked: Marked) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<{supportEmailAddress: string, contactNumber: string, businessAddress: string}> {
    return this.contentful.getEntry('3QsrPP2GqIUo82ecuey880').map((data: any) => {
        data.fields.businessAddress = this.marked.transform(data.fields.businessAddress);
        return data.fields;
      }).toPromise();
  }
}
