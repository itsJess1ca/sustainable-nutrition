import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sn-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // todo: Add destinations for social media
  socialMedia: any[] = [
    {
      name: 'facebook',
      destination: ''
    },
    {
      name: 'twitter',
      destination: ''
    },
    {
      name: 'instagram',
      destination: ''
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
