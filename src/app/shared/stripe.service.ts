import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class StripeService {
  constructor(private zone: NgZone, private http: Http) {}

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

  requestCharge(purchase: StripePurchase) {
    return this.http.post('https://bzv2kepqhi.execute-api.eu-west-1.amazonaws.com/dev/create-charge', purchase);
  }
}

export interface StripePurchase {
  productName: string;
  productPrice: string;
  stripeToken: string;
  receipt_email: string;
}

export interface StripeCard {
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
}
