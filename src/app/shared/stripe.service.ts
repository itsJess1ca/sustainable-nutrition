import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class StripeService {
  constructor(private zone: NgZone) {}

  getToken(card: StripeCard): Observable<StripeTokenResponse> {
    return Observable.create((observer: Observer<any>) => {
      (<any>window).Stripe.card.createToken(card,
        (status: number, response: any) => {
          this.zone.run(() => {
            if (status === 200) {
              observer.next(response);
            } else {
              observer.error(response.error);
            }
            observer.complete();
          });
        });
    });
  }
}


export interface StripeCard {
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
}
