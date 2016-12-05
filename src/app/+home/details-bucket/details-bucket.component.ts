import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'sn-details',
  templateUrl: 'details-bucket.component.html',
  styleUrls: ['details-bucket.component.css']
})
export class DetailsBucketComponent implements OnInit {
  title: string;
  content: string;
  @Input() set data(generalData) {
    if (generalData) {
      this.title = generalData.fields.companyDetailsTitle;
      this.content = generalData.fields.companyDetails;
      this._ref.markForCheck();
    }
  }

  constructor(private _ref: ChangeDetectorRef) { }

  ngOnInit() {
    this._ref.markForCheck();
  }

}
