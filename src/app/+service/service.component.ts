import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../shared/contentful.service';
import { PayMessage, StripeFormComponent } from '../shared/stripe-form/stripe-form.component';
@Component({
  selector: 'sn-service-page',
  templateUrl: 'service.component.html',
  styleUrls: ['service.component.css'],
})
export class ServiceComponent implements OnInit, OnDestroy {
  service: Service;
  payMessage: PayMessage;
  processingPayment: boolean = false;
  @ViewChild('stripeForm') stripeForm: StripeFormComponent;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: {service: Service}) => {
      this.service = data.service;
    });
  }

  ngOnDestroy() {

  }

  openStripeForm() {
    this.processingPayment = true;
    this.stripeForm.openCheckout();
  }
  handleCompleted(response) {
    this.payMessage = response;
    this.processingPayment = false;
  }
}
