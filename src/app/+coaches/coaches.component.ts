import { Component, OnInit } from '@angular/core';
import { ContentfulService, Coach } from '../shared/contentful.service';

@Component({
  selector: 'sn-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit {
  coaches: Promise<Coach[]> = this.content.coaches;
  constructor(private content: ContentfulService) { }

  ngOnInit() {
  }

}
