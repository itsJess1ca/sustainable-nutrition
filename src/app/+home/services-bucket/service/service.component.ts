import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../shared/contentful.service';

@Component({
  selector: 'sn-service',
  templateUrl: 'service.component.html',
  styleUrls: ['service.component.css']
})
export class ServiceComponent implements OnInit {
  @Input() service: BucketService;
  @HostListener('click')
  goToRoute() {
    this.router.navigate([this.service.isService ? 'services' : '', this.service.id]);
  }


  constructor(private router: Router) { }

  ngOnInit() {
  }

}

export interface BucketService extends Service {
  isService: boolean;
}
