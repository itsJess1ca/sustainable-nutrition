import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sn-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: any[] =
    [
      {
        'step': 1,
        'image': 'handplatething.png',
        'title': 'nutrition plan',
        'description' :'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies nisi non risus convallis convallis. Aliquam erat volutpat. Curabitur efficitur sed enim a molestie.'
      },
      {
        'step': 2,
        'image': 'handplatething.png',
        'title': 'recipes',
        'description' :'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies nisi non risus convallis convallis. Aliquam erat volutpat. Curabitur efficitur sed enim a molestie.'
      },
      {
        'step': 3,
        'image': 'handplatething.png',
        'title': 'weekly educational updates',
        'description' :'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies nisi non risus convallis convallis. Aliquam erat volutpat. Curabitur efficitur sed enim a molestie.'
      },
      {
        'step': 4,
        'image': 'handplatething.png',
        'title': 'something else',
        'description' :'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies nisi non risus convallis convallis. Aliquam erat volutpat. Curabitur efficitur sed enim a molestie.'
      }
    ];
  constructor() { }

  ngOnInit() {
  }

}
