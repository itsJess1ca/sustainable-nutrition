import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class StripeService {
  constructor(private zone: NgZone, private http: Http) {}

  getToken(card: StripeCard): Observable<StripeTokenResponse> {
    return Observable.create((observer: Observer<any>) => {
      (<any>window).stripe.createToken(card).then(result => {
        this.zone.run(() => {
          if (result.error) {
            observer.error(result.error);
          } else {
            observer.next(result.token);
          }
          observer.complete();
        });
      });
    });
  }

  requestCharge(purchase: StripePurchase) {
    return this.http.post(`${API_BASE_URL}/stripe/create-charge`, purchase);
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
  receipt_email?: string;
}
