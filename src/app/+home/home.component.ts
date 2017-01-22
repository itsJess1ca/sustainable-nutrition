import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ContentfulService, Service } from '../shared/contentful.service';
import { Observable } from 'rxjs';
import { Marked } from '../shared/marked.service';
@Component({
  selector: 'sn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {
  generalData: Observable<string> = this.content.getEntry('1K8DaO4gbOUoMuI4ISaI8W').map((data: any) => {
    data.fields.companyDetails = this.marked.transform(data.fields.companyDetails);
    return data;
  });
  testimonial: Observable<any> = this.content.getRandomTestimonial();
  coaches: Observable<any> = this.content.coaches;
  services: Observable<Service[]> = this.content.services;
  constructor(public content: ContentfulService, private marked: Marked) { }

  ngOnInit() {
  }
}
