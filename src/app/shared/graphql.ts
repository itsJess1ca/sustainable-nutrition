import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../+blog/blog.component';


@Injectable()
export class GraphqlService {
  fetching: BehaviorSubject<boolean> = new BehaviorSubject(false);
  apiUrl: string = `${API_BASE_URL}/gql`;
  headers: Headers = new Headers({'Content-Type': 'application/json'});
  options: RequestOptions = new RequestOptions({headers: this.headers});
  _blog: Post[];

  get blog(): Promise<Post[]> {
    if (this._blog) {
      return Promise.resolve(this._blog);
    } else {
      return new Promise((resolve, reject) => {
        this.query(`
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
          .map((response: {posts: Post[]}) => {
            console.log('gql response', response);
            return response.posts.map((post: Post) => {
              const date = new Date(post.updatedAt);
              const day = date.getDate();
              const monthIndex = date.getMonth();
              const year = date.getFullYear();
              post.updatedAt = `${day}/${monthIndex}/${year}`;
              return post;
            });
          })
          .subscribe((data) => {
            this._blog = data;
            resolve(data);
          });
      });
    }
  }

  constructor(private http: Http) {
  }

  query<T>(query: string): Observable < T > {
    // console.log('Querying gql: ', query);
    // Expose the fact that we're fetching data to components (this lets us add loading spinners etc)
    this.fetching.next(true);

// Define the request options - url, headers (content-type), and the body (our query)
    const options: RequestOptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl,
      headers: this.headers,
      body: JSON.stringify({
        query: query
      })
    });

// Send off the http request to graphql with the above request options
    return this.http.request(new Request(options))

      // Map the response from JSON to JS
      .map(res => res.json())

      // Expose the fact that we finished fetching
      .do(() => this.fetching.next(false))

      // All graphql responses are in a "data" object - just return this
      .map((res: any) => {
        return res.data;
      });
  }

}
