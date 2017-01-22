import { Injectable } from '@angular/core';
import { Service, ContentfulService } from '../shared/contentful.service';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ServiceResolver implements Resolve<Service> {
  constructor(private contentful: ContentfulService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Service> {
    let name = route.params['service'];

    return this.contentful.getService(name).toPromise();
  }
}
