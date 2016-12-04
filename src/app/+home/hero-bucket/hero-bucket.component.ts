import { Component, OnInit, Input, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'sn-hero',
  templateUrl: 'hero-bucket.component.html',
  styleUrls: ['hero-bucket.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroBucketComponent implements OnInit, AfterViewInit {
  @Input() set title(generalData) {
    if (generalData) {
      this._title = generalData.fields.title;
      this._ref.markForCheck();
    }
  }
  _title: string = '';
  constructor(private _ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
