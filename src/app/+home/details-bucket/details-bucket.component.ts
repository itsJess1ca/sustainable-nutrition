import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'sn-details',
  templateUrl: 'details-bucket.component.html',
  styleUrls: ['details-bucket.component.css']
})
export class DetailsBucketComponent implements OnInit {
  @Input() set title(generalData) {
    if (generalData) {
      this._title = generalData.fields.companyDetailsTitle;
      this._content = generalData.fields.companyDetails;
      this._ref.markForCheck();
    }
  }
  _title: string;
  _content: string;

  constructor(private _ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

}
