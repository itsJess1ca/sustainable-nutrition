import { Component, OnInit } from '@angular/core';
import { Service } from '../shared/contentful.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sn-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  header: {pageDescription: string, pageDescriptionHeader: string};
  services: Service[];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: {services: [Service[], {pageDescription: string, pageDescriptionHeader: string}]}) => {
      this.services = data.services[0];
      this.header = data.services[1];
    });
  }

  servicesTrackBy(index, svc: Service) {
    return svc.id;
  }

}
