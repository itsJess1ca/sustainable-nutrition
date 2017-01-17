import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class GraphqlService {
  fetching: BehaviorSubject<boolean> = new BehaviorSubject(false);
  apiUrl: string = 'https://svttum58sd.execute-api.eu-west-1.amazonaws.com/dev/graphql';
  headers: Headers = new Headers({'Content-Type': 'application/json'});
  options: RequestOptions = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
  }

  query<T>(query: string): Observable<T> {
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
      console.log(res);
        return res.data;
      });
  }

}
