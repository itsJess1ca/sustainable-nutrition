import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../shared/contentful.service';

@Component({
  selector: 'sn-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  contactEmail: Promise<string> = this.contentful.getEntry('3QsrPP2GqIUo82ecuey880').map((data: any) => data.fields.supportEmailAddress).toPromise();
  // todo: Add destinations for social media
  socialMedia: any[] = [
    {
      name: 'facebook',
      destination: 'https://www.facebook.com/SusNutrition'
    },
    {
      name: 'twitter',
      destination: ''
    },
    {
      name: 'instagram',
      destination: 'https://www.instagram.com/susnutrition/'
    },
  ];

  constructor(private contentful: ContentfulService) { }

  ngOnInit() {
  }

}
