import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, ViewChild } from '@angular/core';
import { StripeService, StripePurchase, StripeCard } from '../stripe.service';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'sn-stripe-form',
  templateUrl: 'stripe-form.component.html',
  styleUrls: ['stripe-form.component.css']
})
export class StripeFormComponent implements OnInit, AfterViewInit {
  stripeFormVisible: boolean = false;
  @Input() purchase: StripePurchase;
  @Output() message: EventEmitter<PayMessage> = new EventEmitter<PayMessage>();
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();
  inlineMessage: string;
  api: 'stripe' | 'paymentRequest' = (<any>window).PaymentRequest ? 'paymentRequest' : 'stripe';

  receiptEmail: string = '';

  stripeButtonActive: boolean = false;
  stripeButtonMessage: string = 'Submit Payment';

  card: StripeCard = {
    cvc: '',
    exp_month: '',
    exp_year: '',
    number: ''
  };
  tokenizedCard: string;
  elements = (<any>window).stripe.elements();

  constructor(private stripe: StripeService,
              private notifications: NotificationsService) { }

  ngOnInit() {
    this.resetFormValues();
  }
  ngAfterViewInit() {
    this.configureStripeForm();
  }

  configureStripeForm() {
    const cardNumber = this.elements.create('cardNumber', {
      classes: {
        base: 'form-input__field card-number'
      }
    });
    const cardExpiration = this.elements.create('cardExpiry', {
      classes: {
        base: 'form-input__field card-expiry'
      }
    });
    const cardCvc = this.elements.create('cardCvc', {
      classes: {
        base: 'form-input__field card-cvc'
      }
    });

    const setOutcome = (result) => {
      console.log('result', result);
      console.log('receiptEmail:', this.receiptEmail);

      if (result.token) {
        this.tokenizedCard = result.token.id;
        this.stripeButtonActive = true;
      } else if (result.error) {
        this.stripeButtonActive = false;
        console.error(result.error);
      } else {
        (window as any).stripe.createToken(cardNumber, {
          receipt_email: this.receiptEmail
        }).then(setOutcome);
      }
    };

    cardNumber.addEventListener('change', setOutcome);
    cardExpiration.addEventListener('change', setOutcome);
    cardCvc.addEventListener('change', setOutcome);
    cardNumber.mount('#card-number');
    cardExpiration.mount('#card-expiration');
    cardCvc.mount('#card-cvc');
  }

  openCheckout() {
    console.log('Opening payment with api:', this.api);
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
        this.stripe.getToken(card)
          .switchMap((token) => this.handlePayment(token.id))
          .subscribe(response => {
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
        if (err.code === 9) {
          this.openStripeForm();
        } else {
          console.error(err);
          this.message.emit({type: 'fail', message: 'Payment Cancelled.'});
        }
      });

  }

  submitStripePayment(card: any = this.card) {
    this.stripeButtonActive = false;
    this.purchase.receipt_email = card.receipt_email;
    delete card.receipt_email;
    this.handlePayment(card)
      .subscribe(response => {
      console.log('response', response);
      if (response.status === 'succeeded') {
        this.stripeButtonMessage = 'Thank you.';
        this.message.emit({type: 'success', message: 'Thank you for your purchase'});
        this.closePayWindow({preventDefault: () => {}});
      } else {
        this.resetStripeButton();
        this.message.emit({type: 'fail', message: 'Payment failed'});
      }
    });
  }

  handlePayment(stripeToken: string) {
    console.log(`Handle payment for ${this.purchase.productName}`, stripeToken);

    return Observable.of(stripeToken)
      .switchMap((token) => {
        console.log('Got Charge token', token);
        this.stripeButtonMessage = 'Card Confirmed.';
        setTimeout(() => {
          this.stripeButtonMessage = 'Processing...';
        }, 500);
        this.stripeButtonActive = false;
        this.purchase.stripeToken = token;
        return this.stripe.requestCharge(this.purchase);
      })
      .map(response => response.json())
      .map(response => typeof response.body === 'string' ? Object.assign({}, response, {body: JSON.parse(response.body)}) : response)
      .catch(e => Observable.of(e));
  }

  closePayWindow(event) {
    event.preventDefault();
    this.stripeFormVisible = false;
    this.resetStripeButton();
    this.resetFormValues();
    this.closed.emit();
    // this.message.emit({type: 'closed', message: 'Pay window closed'});
  }

  resetFormValues() {
    this.card = {
      number: ENV === 'production' ? '' : '4242 4242 4242 4242',
      exp_month: ENV === 'production' ? '' : '08',
      exp_year: ENV === 'production' ? '' : '18',
      cvc: ENV === 'production' ? '' : '123',
      receipt_email: ENV === 'production' ? '' : 'fake-email@nowhere.land'
    };
  }

  resetStripeButton() {
    this.stripeButtonActive = true;
    this.stripeButtonMessage = 'Submit Payment';
  }

}

export interface PayMessage {
  type: 'success' | 'fail' | 'closed';
  message: string;
}
