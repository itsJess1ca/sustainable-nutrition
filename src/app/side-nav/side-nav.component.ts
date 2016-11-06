import { Component, OnInit, Input, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'sn-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() Routes: any;
  visible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.visible = true;
  }
  close() {
    this.visible = false;
  }
}
