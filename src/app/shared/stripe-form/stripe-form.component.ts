import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sn-stripe-form',
  template: `
    <button (click)="openCheckout()">Purchase</button>
    {{message}}
  `
})
export class StripeFormComponent implements OnInit {
  @Input() purchase: { title: string; price: string; };
  api: 'stripe' | 'paymentRequest' = (<any>window).PaymentRequest ? 'paymentRequest' : 'stripe';
  message: string = '';
  constructor() { }

  ngOnInit() {

    this.message = `Using ${this.api}`;
  }

  openCheckout() {
    this.message = `Purchasing ${JSON.stringify(this.purchase)} with ${this.api}`;
    const methods = {
      stripe: this.useStripeDirect,
      paymentRequest: this.usePaymentRequest
    };
    methods[this.api]();
  }

  usePaymentRequest() {
    const supportedInstruments = [{
      supportedMethods: [
        'visa', 'mastercard', 'amex', 'discover', 'diners', 'jcb', 'bitcoin'
      ]
    }];
    const details: any = {
      displayItems: [{
        label: 'Test Purchase',
        amount: {currency: 'USD', value: '20.00'}
      }],
      total: {
        label: 'Total due',
        amount: {currency: 'USD', value: '20.00'}
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
    .then(result => {
      console.log(result);
    });

  }

  useStripeDirect() {const handler: any = (<any>window).StripeCheckout.configure({
    key: 'pk_test_4spoIPk72A3xSHPSI4z7yLJV',
    locale: 'auto',
    token: (token: any) => {
      this.message = `Stripe purchase finished - token: ${token}`;
    }
  });
    handler.open({
      name: 'Demo Site',
      description: 'Test thing',
      amount: 2000
    });
  }

}
