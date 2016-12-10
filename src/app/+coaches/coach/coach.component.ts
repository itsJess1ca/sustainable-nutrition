import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Coach } from '../../shared/contentful.service';

@Component({
  selector: 'sn-coach',
  templateUrl: 'coach.component.html',
  styleUrls: ['./coach.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoachComponent implements OnInit {
  @Input() coach: Coach;
  @Input() index: number;

  ngOnInit() {
  }

}
