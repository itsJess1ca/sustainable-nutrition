import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'sn-service',
  templateUrl: 'service.component.html',
  styleUrls: ['service.component.css']
})
export class ServiceComponent implements OnInit {
  @Input() image: string;
  @HostBinding('style.backgroundImage') backgroundImage = this.image;

  constructor() { }

  ngOnInit() {
  }

}
