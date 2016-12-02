import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sn-coaches',
  templateUrl: 'coaches-bucket.component.html',
  styleUrls: ['coaches-bucket.component.css']
})
export class CoachesBucketComponent implements OnInit {
  activeCoach: 'james' | 'clare' = 'james';
  coaches: any = {
    james: {
      name: 'James Lowe',
      details: 'Details about James'
    },
    clare: {
      name: 'Clare Miller',
      details: 'Details about clare'
    }
  };

  constructor() { }

  ngOnInit() {
  }
  get coach() {
    return this.coaches[this.activeCoach];
  }
}
