import { Component, OnInit } from '@angular/core';
import { ContentfulService, Service } from '../shared/contentful.service';

@Component({
  selector: 'sn-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {


  // Thom: I removed the 'step' field - you can just use `index + 1` in your for loop, step isn't in the data :)
  services: Promise<Service[]> = this.contentful.services;
  constructor(private contentful: ContentfulService) { }

  ngOnInit() {

  }

}
