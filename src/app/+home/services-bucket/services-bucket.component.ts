import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sn-services',
  templateUrl: 'services-bucket.component.html',
  styleUrls: ['services-bucket.component.css']
})
export class ServicesBucketComponent implements OnInit {

  services: any[] = [
    {
      name: 'Nutrition Plan',
      image: ''
    },
    {
      name: 'Recipes',
      image: ''
    },
    {
      name: 'Weekly Educational Updates',
      image: ''
    },
    {
      name: 'Something Else',
      image: ''
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
