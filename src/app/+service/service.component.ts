import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../shared/contentful.service';
@Component({
  selector: 'sn-service-page',
  templateUrl: 'service.component.html',
  styleUrls: ['service.component.css'],
})
export class ServiceComponent implements OnInit, OnDestroy {
  service: Service;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: {service: Service}) => {
      this.service = data.service;
    });
  }

  ngOnDestroy() {

  }
}
