import { Component, OnInit, Input, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sn-hero',
  templateUrl: 'hero-bucket.component.html',
  styleUrls: ['hero-bucket.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroBucketComponent implements OnInit, AfterViewInit {
  @Input() set title(generalData) {
    if (generalData) {
      this._title = generalData.fields.heroTitle;
    }
  }
  _title: string = '';
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
