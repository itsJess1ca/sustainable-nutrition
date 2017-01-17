import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GraphqlService } from '../shared/graphql';
import { Post } from './blog.component';

@Injectable()
export class BlogResolver implements Resolve<Post[]> {
  constructor(private gql: GraphqlService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Post[]> {
    return this.gql.query(`
      {
        posts(user:"@sus_nutrition", limit:"5") {
          title
          subtitle
          updatedAt
          url
          excerpt
        }
      }
    `)
      .map((response: {posts: Post[]}) => response.posts.map((post: Post) => {
        const date = new Date(post.updatedAt);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        post.updatedAt = `${day}/${monthIndex}/${year}`;
        return post;
      }))
      .toPromise();
  }
}
