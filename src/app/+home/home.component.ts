import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ContentfulService } from '../shared/contentful.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {
  generalData: Observable<string> = this.content.getEntry('52yMQv1MOkQAKMueWEEcyM');
  testimonial: Observable<any> = this.content.getRandomTestimonial();
  coaches: Observable<any> = this.content.getEntries({'content_type': 'coaches'});
  constructor(public content: ContentfulService) { }

  ngOnInit() {
  }
}
