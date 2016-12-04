import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContentfulService } from '../shared/contentful.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  generalData: Observable<string> = this.content.getEntry('52yMQv1MOkQAKMueWEEcyM');
  testimonial: Observable<any> = this.content.getRandomTestimonial();
  coaches: Observable<any> = this.content.getEntries({'content_type': 'coaches'});
  constructor(public content: ContentfulService, private _ref: ChangeDetectorRef) { }

  ngOnInit() {
    const interval = setInterval(() => {
      if (this.generalData && this.generalData.source && this.generalData.source.value !== null) {
        clearInterval(interval);
      }
      this._ref.markForCheck();
    }, 100);
    const interval2 = setInterval(() => {
      if (this.testimonial && this.testimonial.source && this.testimonial.source.value !== null) {
        clearInterval(interval2);
      }
      this._ref.markForCheck();
    }, 100);
    const interval3 = setInterval(() => {
      if (this.coaches && this.coaches.source && this.coaches.source.value !== null) {
        clearInterval(interval3);
      }
      this._ref.markForCheck();
    }, 100);
  }
}
