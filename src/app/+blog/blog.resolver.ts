import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GraphqlService } from '../shared/graphql';
import { Post } from './blog.component';

@Injectable()
export class BlogResolver implements Resolve<Post[]> {
  constructor(private gql: GraphqlService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Post[]> {
    return this.gql.blog;
  }
}
