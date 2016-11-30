import { Component } from '@angular/core';
import { PageScrollConfig } from 'ng2-page-scroll';

@Component({
  selector: 'sn-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  navList: NavItem[] = [
    {
      name: 'Home',
      destination: ['home']
    },
    {
      name: 'Services',
      destination: ['services']
    },
    {
      name: 'Coaches',
      destination: ['coaches']
    },
    {
      name: 'Blog',
      destination: ['blog']
    },
    {
      name: 'Testimonials',
      destination: ['testimonials']
    },
    {
      name: 'Contact',
      destination: ['contact']
    }
  ];

  constructor() {
    PageScrollConfig.defaultDuration = 250;
  }
}

interface NavItem {
  name: string;
  destination: any;
}
