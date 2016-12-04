import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sn-coaches',
  templateUrl: 'coaches-bucket.component.html',
  styleUrls: ['coaches-bucket.component.css']
})
export class CoachesBucketComponent implements OnInit {
  activeCoach: 'james' | 'clare' = 'james';
  @Input() coaches: any;
  /*coaches: any = {
    james: {
      name: 'James Lowe',
      details: 'Details about James'
    },
    clare: {
      name: 'Clare Miller',
      details: 'Details about clare'
    }
  };*/

  constructor() { }

  ngOnInit() {
  }
  get coach() {
    if (!this.coaches) return;
    return this.coaches.filter(coach => coach.firstName.toLowerCase() === this.activeCoach)[0];
  }
  switchCoachTo(name: 'james' | 'clare') {
    this.activeCoach = name;
  }
}
