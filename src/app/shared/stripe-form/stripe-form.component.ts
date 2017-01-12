import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sn-stripe-form',
  template: `
    <button (click)="openCheckout()">Purchase</button>
    {{message}}
  `
})
export class StripeFormComponent implements OnInit {
  stripeKey = 'pk_test_4spoIPk72A3xSHPSI4z7yLJV';
  message: string = '';
  constructor() { }

  ngOnInit() { }

  openCheckout() {
    if ((<any>window).PaymentRequest) {
      this.message = 'using paymentrequest';
      return this.usePaymentRequest();
    }
    this.message = 'using stripe';
    return this.useStripeDirect();
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
    key: this.stripeKey,
    locale: 'auto',
    token: function (token: any) {

    }
  });
    handler.open({
      name: 'Demo Site',
      description: 'Test thing',
      amount: 2000
    });
  }

}
