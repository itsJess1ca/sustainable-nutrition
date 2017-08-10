import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { PageScrollConfig } from 'ng2-page-scroll';
import { Router, NavigationEnd } from '@angular/router';
import { GraphqlService } from './shared/graphql';
import { ContentfulService } from './shared/contentful.service';

@Component({
  selector: 'sn-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {
  navList: NavItem[] = [
    {
      name: 'home',
      destination: ['home']
    },
    {
      name: 'services',
      destination: ['services']
    },
    {
      name: 'coaches',
      destination: ['coaches']
    },
    {
      name: 'blog',
      destination: ['blog']
    },
    {
      name: 'testimonials',
      destination: ['testimonials']
    },
    {
      name: 'contact',
      destination: ['contact']
    }
  ];
  currentPage: possibleRoutes = 'home';
  activeTheme: 'home' | 'other' = this.currentPage === 'home' ? 'home' : 'other';

  constructor(private router: Router, private gql: GraphqlService, private contentful: ContentfulService) {
    this.gql.blog.then((posts) => {
      console.log(`Preloaded ${posts.length} blog posts`);
    });
    PageScrollConfig.defaultDuration = 250;


    console.log('Setting Stripe key to: ', STRIPE_KEY);
    Stripe.setPublishableKey(STRIPE_KEY);
  }
  ngOnInit() {
    this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        const r: possibleRoutes = <possibleRoutes>event.url.replace('/', '');
        this.currentPage = r === '' ? 'home' : r;
        this.activeTheme = this.currentPage === 'home' ? 'home' : 'other';
      }
    });
  }

}

interface NavItem {
  name: string;
  destination: any;
}
type possibleRoutes = 'home' | 'services' | 'coaches' | 'blog' | 'testimonials' | 'contact' | '';
