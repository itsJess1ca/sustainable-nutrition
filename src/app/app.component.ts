import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sn-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ]
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
  ]
}

interface NavItem {
  name: string;
  destination: any;
}
