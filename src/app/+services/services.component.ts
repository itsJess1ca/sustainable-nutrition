import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sn-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  // Thom: I removed the 'step' field - you can just use `index + 1` in your for loop, step isn't in the data :)
  services: any[] =
    [
      {
        'image': 'handplatething.png',
        'title': 'nutrition plan',
        'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies nisi non risus convallis convallis. Aliquam erat volutpat. Curabitur efficitur sed enim a molestie.'
      },
      {
        'image': 'handplatething.png',
        'title': 'recipes',
        'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies nisi non risus convallis convallis. Aliquam erat volutpat. Curabitur efficitur sed enim a molestie.'
      },
      {
        'image': 'handplatething.png',
        'title': 'weekly educational updates',
        'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies nisi non risus convallis convallis. Aliquam erat volutpat. Curabitur efficitur sed enim a molestie.'
      },
      {
        'image': 'handplatething.png',
        'title': 'something else',
        'description' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies nisi non risus convallis convallis. Aliquam erat volutpat. Curabitur efficitur sed enim a molestie.'
      }
    ];
  constructor() { }

  ngOnInit() {
  }

}
