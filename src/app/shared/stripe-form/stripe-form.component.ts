import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StripeService, StripePurchase, StripeCard } from '../stripe.service';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';

@Component({
  selector: 'sn-stripe-form',
  templateUrl: 'stripe-form.component.html',
  styleUrls: ['stripe-form.component.css']
})
export class StripeFormComponent implements OnInit {
  stripeFormVisible: boolean = false;
  @Input() purchase: StripePurchase;
  @Output() message: EventEmitter<PayMessage> = new EventEmitter<PayMessage>();
  inlineMessage: string;
  api: 'stripe' | 'paymentRequest' = (<any>window).PaymentRequest ? 'paymentRequest' : 'stripe';

  stripeButtonActive: boolean = true;
  stripeButtonMessage: string = 'Submit Payment';

  card: FormGroup;

  constructor(private stripe: StripeService,
              private notifications: NotificationsService) { }

  ngOnInit() {
    this.resetFormValues();
  }

  openCheckout() {
    const methods = {
      stripe: this.openStripeForm.bind(this),
      paymentRequest: this.usePaymentRequest.bind(this)
    };
    methods[this.api]();
  }

  openStripeForm() {
    this.stripeFormVisible = true;
  }

  usePaymentRequest() {
    const supportedInstruments = [{
      supportedMethods: [
        'visa', 'mastercard', 'amex', 'discover', 'diners', 'jcb', 'bitcoin'
      ]
    }];
    const details: any = {
      displayItems: [{
        label: this.purchase.productName,
        amount: {
          currency: 'GBP',
          value: this.purchase.productPrice
        }
      }],
      total: {
        label: 'Total due',
        amount: {
          currency: 'GBP',
          value: this.purchase.productPrice
        }
      }
    };
    const options = {
      requestShipping: false,
      requestPayerEmail: true,
      requestPayerPhone: false,
      requestPayerName: true
    };

    // Create a `PaymentRequest` instance
    const request = new PaymentRequest(supportedInstruments, details, options);

    // Show the native UI with `.show()`
    request.show()
      // Process the payment
      .then((paymentResponse: any) => {
      console.log(paymentResponse);
      this.purchase.receipt_email = paymentResponse.payerEmail;
        const card: StripeCard = {
          exp_month: paymentResponse.details.expiryMonth,
          exp_year: paymentResponse.details.expiryYear,
          cvc: paymentResponse.details.cardSecurityCode,
          number: paymentResponse.details.cardNumber
        };
        this.handlePayment(card).subscribe(response => {
          if (response.statusCode === 200) {
            paymentResponse.complete('success').then(() => {
              this.message.emit({type: 'success', message: 'Thank you for your purchase.'});
            });
          } else {
            paymentResponse.complete('fail');
            this.message.emit({type: 'fail', message: 'Payment Failed.'});
          }
        });
      })
      .catch(err => {
        console.error('Uh oh, something bad happened', err.message);
      });

  }

  submitStripePayment(card: any = this.card.value) {
    this.purchase.receipt_email = card.receipt_email;
    delete card.receipt_email;
    this.handlePayment(card).subscribe(response => {
      if (response.statusCode === 200) {
        this.stripeButtonMessage = 'Thank you.';
        this.message.emit({type: 'success', message: 'Thank you for your purchase'});
        this.closePayWindow();
      } else {
        this.resetStripeButton();
        console.log(response.errorMessage);
      }
    });
  }

  handlePayment(card: StripeCard) {
    console.log(`Handle payment for ${this.purchase.productName}`, card);

    return this.stripe
      .getToken(card)
      .switchMap((token) => {
        console.log('Got Charge token', token);
        this.stripeButtonMessage = 'Card Confirmed.';
        setTimeout(() => {
          this.stripeButtonMessage = 'Processing...';
        }, 500);
        this.stripeButtonActive = false;
        this.purchase.stripeToken = token.id;
        return this.stripe.requestCharge(this.purchase);
      })
      .map(response => response.json())
      .map(response => typeof response.body === 'string' ? Object.assign({}, response, {body: JSON.parse(response.body)}) : response)
      .catch(e => Observable.of(e));
  }

  /*getToken(card: StripeCard): Promise<StripePurchase> {
    return new Promise((resolve, reject) => {
      this.stripeButtonMessage = 'Processing...';
      this.stripeButtonActive = false;
      this.stripe.getToken(card || this.card.value)
        .subscribe(
          (token: StripeTokenResponse) => {
            this.stripeButtonMessage = 'Done!';
            this.stripeButtonActive = false;
            this.purchase.stripeToken = token.id;
            this.stripe.requestCharge(this.purchase)
              .subscribe(data => {
                resolve(data);
              });
          },
          (err: any) => {
            this.stripeButtonMessage = 'Error!';
            this.stripeButtonActive = true;
            this.message.emit({type: 'fail', message: err.message});
            reject(err);
            this.notifications.error(err.type, err.message, {timeOut: 5000});
          });
    });
  }*/

  closePayWindow() {
    event.preventDefault();
    this.stripeFormVisible = false;
    this.resetStripeButton();
    this.resetFormValues();
  }

  resetFormValues() {
    this.card = new FormGroup({
      number: new FormControl('4242 4242 4242 4242'),
      exp_month: new FormControl('08'),
      exp_year: new FormControl('18'),
      cvc: new FormControl('123'),
      receipt_email: new FormControl('fake-email@nowhere.land')
    });
  }

  resetStripeButton() {
    this.stripeButtonActive = true;
    this.stripeButtonMessage = 'Submit Payment';
  }

}

export interface PayMessage {
  type: 'success' | 'fail';
  message: string;
}
