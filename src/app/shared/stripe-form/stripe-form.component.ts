import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StripeService } from '../stripe.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'sn-stripe-form',
  templateUrl: 'stripe-form.component.html',
  styleUrls: ['stripe-form.component.css']
})
export class StripeFormComponent implements OnInit {
  stripeFormVisible: boolean = false;
  @Input() purchase: {title: string; price: string; };
  api: 'stripe' | 'paymentRequest' = (<any>window).PaymentRequest ? 'paymentRequest' : 'stripe';
  message: string = '';

  stripeButtonActive: boolean = true;
  stripeButtonMessage: string = 'Submit Payment';

  card: FormGroup;

  constructor(
    private stripe: StripeService,
    private notifications: NotificationsService
  ) { }

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
    console.log('Showing stripe form');
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

  getToken() {
    event.preventDefault();
    this.stripeButtonMessage = 'Processing...';
    this.stripeButtonActive = false;
    this.stripe.getToken(this.card.value)
      .subscribe(
        (token: StripeTokenResponse) => {
          this.stripeButtonMessage = 'Done!';
          this.stripeButtonActive = false;
          this.notifications.success('Success!', token.id);
          setTimeout(() => {
            this.closePayWindow();
          }, 2000);
        },
        (err: any) => {
          this.stripeButtonMessage = 'Error!';
          this.stripeButtonActive = true;
          this.message = err.message;
          this.notifications.error(err.type, err.message);
        });
  }

  closePayWindow() {
    this.stripeFormVisible = false;
    this.resetStripeButton();
    this.resetFormValues();
  }

  resetFormValues() {
    this.card = new FormGroup({
      number: new FormControl('4242 4242 4242 4242'),
      exp_month: new FormControl('08'),
      exp_year: new FormControl('18'),
      cvc: new FormControl('123')
    });
  }

  resetStripeButton() {
    this.stripeButtonActive = true;
    this.stripeButtonMessage = 'Submit Payment';
  }

}

