import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../../shared/contentful.service';

@Component({
  selector: 'sn-services',
  templateUrl: 'services-bucket.component.html',
  styleUrls: ['services-bucket.component.css']
})
export class ServicesBucketComponent implements OnInit {

  @Input()
  services: Service[];

  constructor() { }

  ngOnInit() {
  }

}
